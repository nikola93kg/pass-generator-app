import React, { useState, useEffect, useMemo } from 'react';
import './Container.css';
import Button from './button/Button';
import Slider from './slider/Slider';
import Checkbox from './checkbox/Checkbox';
import { generatePassword, setPasswordLength, copyToClipboard } from '../../Utils/Helper';

const CHECKBOX_LIST = [
    {
        id: 0,
        name: 'uppercase',
        label: 'Uppercase',
        isChecked: true,
    },
    {
        id: 1,
        name: 'lowercase',
        label: 'Lowercase',
        isChecked: true,
    },
    {
        id: 2,
        name: 'symbols',
        label: 'Symbols',
        isChecked: true,
    },
    {
        id: 3,
        name: 'numbers',
        label: 'Numbers',
        isChecked: true,
    },
]

function Container({ setPassword, setRange, setPassProps, passwordRef, type }) {

    const [rangeValue, setRangeValue] = useState(12);
    const [checkbox, setCheckbox] = useState({
        uppercase: true,
        lowercase: true,
        symbols: true,
        numbers: true
    });
    const [checked, setChecked] = useState(false);
    const [checkedName, setCheckedName] = useState('');
    const [minMaxValue, setMinMaxValue] = useState({
        min: 1,
        max: 60
    })

    const { uppercase, lowercase, symbols, numbers } = checkbox;
    const { min, max } = minMaxValue;

    useEffect(() => {
        setPasswordLength(rangeValue);
        setRange(rangeValue);
        setRangeValue(rangeValue);
        passwordGenerated(checkbox, rangeValue);
        checkBoxCount();

    }, [uppercase, lowercase, symbols, numbers]);


    const checkBoxCount = () => {
        const checkedCount = Object.keys(checkbox).filter(key => checkbox[key]);
        const disabled = checkedCount.length === 1;
        const name = checkedCount[0];
        if (disabled) {
            setChecked(disabled);
            setCheckedName(name);
        } else {
            setChecked(false);
            setCheckedName('');
        }
    }

    const updateCheckBoxes = () => {
        if (type === 'pin') {
            CHECKBOX_LIST.map(checkbox => {
                const name = checkbox.name;
                if (name !== 'numbers') {
                    checkbox.isChecked = false;
                    const checkboxProps = {
                        name,
                        checkedName: name,
                        checked: true,
                        isChecked: checkbox.isChecked,
                        min: 0,
                        max: 15,
                        length: 3
                    }
                    checkBoxProperties(checkboxProps);
                }
                return '';
            });
        } else {
            CHECKBOX_LIST.map(checkbox => {
                const name = checkbox.name;
                checkbox.isChecked = true;
                const checkboxProps = {
                    name,
                    checkedName: '',
                    checked: false,
                    isChecked: checkbox.isChecked,
                    min: 1,
                    max: 60,
                    length: 12
                }
                checkBoxProperties(checkboxProps);
                return '';
            });
        }
    }

    const checkBoxProperties = (checkBoxProps) => {
        const { name, checked, isChecked, checkedName, min, max, length } = checkBoxProps;
        setCheckbox(prevState => ({ ...prevState, [name]: isChecked }));
        setChecked(checked);
        setCheckedName(checkedName);
        setPasswordLength(length);
        setMinMaxValue({ min, max });
        setRangeValue(length);
        setRange(length);
    }

    // useMemo(updateCheckBoxes, [type]);

    useEffect(() => {
        updateCheckBoxes()
    }, [type])

    const passwordGenerated = (checkbox, rangeValue) => {
        const pass = rangeValue > 3 ? generatePassword(checkbox, rangeValue) : generatePassword(checkbox, 3);
        setPassword(pass);
        setPassProps(checkbox);
    }

    const onChangeSlider = (e) => {
        setPasswordLength(e.target.value);
        setRangeValue(e.target.value);
        setRange(e.target.value);
        passwordGenerated(checkbox, e.target.value)
    }

    const onChangeCheckbox = (e) => {
        if (type !== 'pin') {
            let { name, checked } = e.target;
            CHECKBOX_LIST.map(checkbox => {
                if (checkbox.name === name) {
                    checkbox.isChecked = checked;
                    setCheckbox(prevState => ({ ...prevState, [name]: checkbox.isChecked }));
                    setPasswordLength(rangeValue);
                    setRangeValue(rangeValue);
                }
                return '';
            });
        }
    }

    const copyClipboard = elementRef => e => {
        e.preventDefault();
        copyToClipboard(elementRef);
    }

    return (
        <div className='password-settings'>
            <h3>Use the slider, and select from the options</h3>

            <div className="row">
                <div className="col-12">
                    <div className='form-group'>
                        &nbsp;
                        <Slider
                            min={parseInt(min, 10)}
                            max={parseInt(max, 10)}
                            step={1}
                            defaultLength={parseInt(rangeValue, 10)}
                            value={parseInt(rangeValue, 10)}
                            onChangeValue={onChangeSlider}
                        />
                    </div>
                </div>

                <div className="col-12">
                    <div className="row checkbox-container">
                        {
                            CHECKBOX_LIST.map(checkbox => {
                                const { id, name, label, isChecked } = checkbox;
                                return <Checkbox key={id}
                                    name={name}
                                    checked={isChecked}
                                    label={label}
                                    value={isChecked}
                                    onChange={onChangeCheckbox}
                                    disabled={checked && checkbox.isChecked && checkedName === checkbox.name} />
                            })
                        }
                    </div>
                </div>
            </div>
            <br />
            <div className="text-center">
                <div className="row">
                    <div className="col-12">
                        <Button className='btn password-btn btn-primary' label='Copy password' handleClick={copyClipboard(passwordRef.current)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container
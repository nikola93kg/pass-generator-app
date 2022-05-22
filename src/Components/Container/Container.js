import React, { useState } from 'react';
import './Container.css';
import Button from './button/Button';
import Slider from './slider/Slider';
import Checkbox from './checkbox/Checkbox';

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

function Container() {

    const [rangeValue, setRangeValue] = useState(12);
    const [checkbox, setCheckbox] = useState({
        uppercase: true,
        lowercase: true,
        symbols: true,
        numbers: true
    });
    const [checked, setChecked] = useState(false);
    const [checkedName, setCheckedName] = useState('');

    const onChangeSlider = (e) => {
        setRangeValue(e.target.value)
    }
    const onChangeCheckbox = (e) => {
        let { name, checked } = e.target;
        CHECKBOX_LIST.map(checkbox => {
            if (checkbox.name === name) {
                checkbox.isChecked = checked;
                setCheckbox({ [name]: checkbox.isChecked })
            }
            return ''
        })
        console.log(CHECKBOX_LIST);
    }

    return (
        <div className='password-settings'>
            <h3>Use the slider, and select from the options</h3>

            <div className="row">
                <div className="col-12">
                    <div className='form-group'>
                        &nbsp;
                        <Slider min={1}
                            max={60}
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
                                    disabled={false} />
                            })
                        }
                    </div>
                </div>
            </div>
            <br />
            <div className="text-center">
                <div className="row">
                    <div className="col-12">
                        <Button className='btn password-btn btn-primary' label='Copy password' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container
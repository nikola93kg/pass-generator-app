import React, { useState, useRef } from 'react';
import Container from '../Container/Container';
import Button from '../Container/button/Button';
import Tooltip from '../Container/tooltip/Tooltip';
import { generatePassword, copyToClipboard } from '../../Utils/Helper';
import './Display.css';


function Display() {

    const [password, setPassword] = useState('');
    const [rangeValue, setRange] = useState();
    const [passProps, setPassProps] = useState();
    const [tooltip, setTooltip] = useState(false);
    const [type, setType] = useState('password');

    const passwordRef = useRef(null);

    let passDescription = ''

    const generateNewPassword = () => {
        const pwd = rangeValue > 3 ? generatePassword(passProps, rangeValue) : generatePassword(passProps, 3);
        setPassword(pwd);
    }

    const copyClipboard = (e) => {
        e.preventDefault();
        copyToClipboard(passwordRef.current);
        setTooltip(true);
        setTimeout(() => {
            setTooltip(false)
        }, 2000)
    }

    const onSelectTag = (e) => {
        setType(e.target.value)
    }

    const setBackgroundColor = (password) => {
        if (password && password.length === 1 && password.length <= 5) {
            passDescription = 'Bad password';
            return '#cb473e5';
        } else if (password && password.length >= 6 && password.length <= 10) {
            passDescription = 'Weak password';
            return '#f07d58';
        } else if (password && password.length > 10) {
            passDescription = 'Strong password';
            return '#55a95d';
        } else {
            passDescription = 'Bad password';
            return '#cb473e';
        }
    }

    return (
        <>
            <div className='dropdown'>
                <select
                    name="type"
                    value={type}
                    onChange={onSelectTag}
                    className="form-control form-control-sm"
                    style={selectTagStyle} >
                    <option value="password">Random password</option>
                    <option value="pin">PIN</option>
                </select>
            </div>

            <div className="row">
                <div className="col-12 password-display-container" style={{ backgroundColor: setBackgroundColor(password) }}>
                    <div className='pass-width'>
                        <div className="password-display">
                            <input ref={passwordRef} type="text" value={password} readOnly className='password-display-input' />
                        </div>
                        <div className="password-description">
                            {
                                password && password.length > 10 ?
                                    <>
                                        <i className='fas fa-check-circle'></i> {passDescription}
                                    </> :
                                    <>
                                        <i className='fas fa-exclamation-circle'></i> {passDescription}
                                    </>
                            }
                        </div>
                    </div>

                    <div className="password-display-icons">
                        <Button className='copy-btn' iconClass='far fa-copy' handleClick={(e) => copyClipboard(e)} />
                        <Button className='generate-btn' iconClass='fas fa-sync-alt' handleClick={() => generateNewPassword()} />
                        <Tooltip message='Copied' position='left' displayTooltip={tooltip} />
                    </div>

                </div>
            </div>

            <Container
                setPassword={setPassword}
                setRange={setRange}
                setPassProps={setPassProps}
                passwordRef={passwordRef}
                type={type}
            />
        </>
    )
}

const selectTagStyle = {
    backgroundColor: 'inherit',
    color: '#506175',
    width: '20%',
    height: 'auto',
    marginLeft: '-4px'
}

export default Display
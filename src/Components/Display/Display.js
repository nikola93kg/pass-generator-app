import React, { useState, useRef } from 'react';
import './Display.css'
import Container from '../Container/Container';
import Button from '../Container/button/Button';
import { generatePassword, copyToClipboard } from '../../Utils/Helper';

function Display() {

    const [password, setPassword] = useState('');
    const [rangeValue, setRange] = useState();
    const [passProps, setPassProps] = useState();

    const passwordRef = useRef(null);

    let passDescription = ''

    const generateNewPassword = () => {
        const newGeneratedPass = generatePassword(passProps, rangeValue);
        setPassword(newGeneratedPass)
    }

    const copyClipboard = (e) => {
        e.preventDefault();
        copyToClipboard(passwordRef.current)
    }

    const setBackgroundColor = (password) => {
        if (password && password.length === 1 && password.length <= 5) {
            passDescription = 'Bad password';
            return '#cb473e';
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
                    </div>

                </div>
            </div>

            <Container setPassword={setPassword} setRange={setRange} setPassProps={setPassProps} />
        </>
    )
}

export default Display
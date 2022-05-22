import React from 'react';
import './Display.css'
import Container from '../Container/Container';
import Button from '../Container/button/Button';

function Display() {
    return (
        <>
            <div className="row">
                <div className="col-12 password-display-container">
                    <div>
                        <div className="password-display">
                            <input type="text" value='lajhdgSH39V(3/s' readOnly className='password-display-input' />
                        </div>
                        <div className="password-description">
                            <i className='fas fa-check-circle'></i> Strong password
                        </div>
                    </div>

                    <div className="password-display-icons">
                        <Button className='copy-btn' iconClass='far fa-copy' />
                        <Button className='generate-btn' iconClass='fas fa-sync-alt' />
                    </div>

                </div>
            </div>

            <Container />
        </>
    )
}

export default Display
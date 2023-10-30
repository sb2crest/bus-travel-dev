import React, { useState } from 'react';
import './Warning.scss';

const Warning: React.FC = () => {
    
    return (
        <div className='warning-container'>
            <div className='warning-container-center'>
                <div className='warning-content'>
                    <div className='warning-body'>
                        <div className='warning-header-container'>
                            <i className="fa-solid fa-triangle-exclamation warning-icon"></i>
                        </div>
                        <div className='warning-message-container'>
                            <p className='warning-message'>
                                You have left a fields empty and value must be entered
                            </p>
                        </div>
                        <div className='warning-button-container'>
                            <button className='okay-button'>Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Warning;
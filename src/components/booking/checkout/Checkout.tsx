import React from 'react';
import './Checkout.scss';

const Checkout = () => {
    return (
        <div className='checkout-main-container'>
            <div className='checkout-content-container'>
                <div className='checkout-pop-up'>
                    <div className='checkout-vehicle-info'>
                        <h1>Vehicle Info</h1>
                    </div>
                    <div className='checkout-payment-summary'>
                        <h1>Payment Summary</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
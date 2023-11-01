import React, { useState, useEffect, MouseEventHandler } from 'react';
import './Checkout.scss';
import Confirmation from '../Booking Confirmation/Confirmation';
import VehicleImage from '../../../assets/images/booking-summary-dummy-image.webp';
import displayRazorpay from '../payment/utils/PaymentGateway';

interface CheckoutProps {
    bookingId: string;
    phoneNumber: string;
}

const Checkout: React.FC<CheckoutProps> = ({ bookingId, phoneNumber }) => {
    const [showModal, setShowModal] = useState(false);
    const loadScript = (src: any) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    });
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const razorpay: MouseEventHandler<HTMLButtonElement> = async (event) => {
        const bookingId = 'BookingId';
        const mobile = 'MobileNumber';
        const amount = 100;
        await displayRazorpay(bookingId, mobile, amount);
    };

    return (
        <div className="modal-checkout" id="newPopUp">
            <>
                <div className="modal-dialog-checkout" role="document">
                    <div className="modal-checkout-content">
                        <div className="modal-checkout-body">
                            <div className='checkout-container'>
                                <div className='summary-container'>
                                    {/* <div className='booking-summary'>
                                        <p className='booking-summary-header'>
                                            Booking Summary
                                        </p>
                                    </div> */}
                                    <div className='booking-summary-content'>
                                        <div className='image-container'>
                                            <img src={VehicleImage} alt='Vehicle-Image' />
                                        </div>
                                        <div className='summary-content'>
                                            <p className='booking-id'>Booking ID <br />
                                                <span className='booking-number'>{bookingId}</span>
                                            </p>
                                            <div className='phone-number-container'>
                                                <p className='phone-number'>Phone Number <br />
                                                    <span className='mobile'>{phoneNumber}</span>
                                                </p>
                                            </div>
                                            <div className='from-to-date'>
                                                <p className='from'>From Date <br />
                                                    <span className='from-date'>31-10-2023</span>
                                                </p>
                                                <p className='to'>To Date <br />
                                                    <span className='to-date'>11-05-2023</span>
                                                </p>
                                            </div>
                                            <div className='line'></div>
                                            <div className='fare-container'>
                                                <p className='fare-header'>Fare Details</p>
                                                <div className='line'></div>
                                                <p className='amount-header'>Amount
                                                    <span className='price'>INR 20000</span>
                                                    <br />
                                                    <span className='tax-cal'>(Taxes will be calculated during tax)</span>
                                                </p>
                                                <div className='line'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div>
                                    <p>Show Fare Details</p>
                                </div> */}
                                <div className='checkout-container'>
                                    <button type="button" className='checkout-button' onClick={razorpay} >
                                        Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default Checkout;

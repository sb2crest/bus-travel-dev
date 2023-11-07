import React, { useState, useEffect, MouseEventHandler } from 'react';
import './Checkout.scss';
import { Link } from 'react-router-dom';
import VehicleImage from '../../../assets/images/booking-summary-dummy-image.webp';
import displayRazorpay from '../payment/PaymentGateway';

interface CheckoutProps {
    bookingId: string;
    phoneNumber: string;
}

const Checkout: React.FC<CheckoutProps> = ({ bookingId, phoneNumber }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showFareDetails, setShowFareDetails] = useState(false);

    const fareDetails = () => {
        setShowFareDetails(true);
    }

    const hideDetails = () => {
        setShowFareDetails(false);
    }
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
    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const razorpay: MouseEventHandler<HTMLButtonElement> = async (event) => {
        const amount = 100;
        await displayRazorpay(bookingId, phoneNumber, amount);
    };
    return (
        <div className="modal-checkout" id="newPopUp">
            <>
                <div className="modal-dialog-checkout" role="document">
                    <div className="modal-checkout-content">
                        <div className="modal-checkout-body">
                            <div className='checkout-container'>
                                <div className='summary-container'>
                                    <div className='booking-summary-content'>
                                        <div className='image-container'>
                                            <Link to="/vehicleinfo">
                                                <img src={VehicleImage} alt='Vehicle-Image' />
                                            </Link>
                                        </div>
                                        <div className='summary-content'>
                                            <div className='section-01'>
                                                <p className='booking-id'>Booking ID <br />
                                                    <span className='booking-number'>{bookingId}</span>
                                                </p>
                                                <p className='from'>From Date <br />
                                                    <span className='from-date'>31-10-2023</span>
                                                </p>
                                            </div>
                                            <div className='from-to-date'>
                                                <p className='phone-number'>Phone Number <br />
                                                    <span className='mobile'>{phoneNumber}</span>
                                                </p>
                                                <p className='to'>To Date <br />
                                                    <span className='to-date'>11-05-2023</span>
                                                </p>
                                            </div>
                                            <div className='line'></div>
                                            <div className='fare-container'>
                                                <p className='fare-header'>Fare Details</p>
                                                <div className='line'></div>
                                                {showFareDetails && (
                                                    <>
                                                        <p className='show-hide-fare-details' onClick={hideDetails}>Hide Fare Details</p>
                                                        <div className='base-fare'>
                                                            Basic Fare <span className='fare'> 19,800 INR</span>
                                                        </div>
                                                        <div className='gst-fare'>
                                                            GST <span className='gst-percentage'> 3542 INR</span>
                                                        </div>
                                                        <div className='line'></div>
                                                    </>
                                                )}
                                                <p className='amount-header'>Amount
                                                    <span className='price'> 20000 INR</span>
                                                    <br />
                                                    <span className='tax-cal'>(Taxes will be calculated during payment)</span>
                                                </p>
                                                <p className='show-hide-fare-details' onClick={fareDetails} >Show Fare Details</p>
                                                <div className='line'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='checkout-container'>
                                    <Link to="/home"> <button type='button' className='close-button'>
                                        Close
                                    </button></Link>
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

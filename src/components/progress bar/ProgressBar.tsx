import React, { useState } from 'react';
import './ProgressBar.scss';
import BookingForm from '../booking form/BookingForm';
import footerImage from '../../assets/images/progressbar-footer-image.jpg';
import Checkout from '../summary/Checkout';
import Approval from '../approval/Approval';

const ProgressBar: React.FC = () => {
    const [firstStepCompleted, setFirstStepCompleted] = useState(false);
    const [secondStepCompleted, setSecondStepCompleted] = useState(false);
    const [thirdStepcompleted, setThirdStepCompleted] = useState(false);
    const [lastStepCompleted, setLastStepCompleted] = useState(false);

    /* Steps in Progress Bar */
    const handleFirstStep = (value: boolean) => {
        console.log("value of first step:" + value);
        setFirstStepCompleted(value);
    };

    const handleSecondStep = (value: boolean) => {
        console.log("value of second step:" + value);
        setSecondStepCompleted(value);
    };

    const handleThirdStep = (value: boolean) => {
        console.log("value of third step:" + value);
        setThirdStepCompleted(value);
    }

    const handleLastStep = (value: boolean) => {
        console.log("value of last step:" + value);
        setLastStepCompleted(value);
    }

    const [bookingId, setBookingId] = useState<string>('');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    // Callback function to receive the bookingId from BookingForm
    const handlePropsUpdate = (bookingId: string, fromDate: string, toDate: string, phoneNumber: string) => {
        setBookingId(bookingId);
        setFromDate(fromDate);
        setToDate(toDate);
        setPhoneNumber(phoneNumber);
    };

    return (
        <>
            <div className='progress-container'>
                <div className='progress-content'>
                    <ul>
                        <li>
                            <i className="icons awesome fa-solid fa-user"></i>
                            <div className={`first-round   ${firstStepCompleted ? 'firststepcompleted' : ''}`}>
                                <i className="awesome fa-solid fa-check"></i>
                            </div>
                            <p className="label">Details</p>
                        </li>
                        <li>
                            <i className="icons awesome fa-solid fa-bus"></i>
                            <div className={`second-round ${secondStepCompleted ? 'secondstepcompleted' : ''}`}>
                                <i className="awesome fa-solid fa-check"></i>
                            </div>
                            <p className="label">Review Booking</p>
                        </li>
                        <li>
                            <i className="icons awesome fa-solid fa-indian-rupee-sign"></i>
                            <div className={`third-round ${thirdStepcompleted ? 'thirdstepcompleted' : ''}`}>
                                <i className="awesome fa-solid fa-check"></i>
                            </div>
                            <p className="label">Payment</p>
                        </li>
                        <li>
                            <i className="icons awesome fa-solid fa-thumbs-up"></i>
                            <div className={`last-round ${lastStepCompleted ? 'laststepcompleted' : ''}`}>
                                <i className="awesome fa-solid fa-check"></i>
                            </div>
                            <p className="label">Approval</p>
                        </li>
                    </ul>
                </div>
                {firstStepCompleted ?
                    <Checkout fromDate={fromDate} toDate={toDate} bookingId={bookingId} phoneNumber={phoneNumber}
                        secondStepProp={handleSecondStep} thirdStepProp={handleThirdStep} lastStepProp={handleLastStep} />
                    :
                    <BookingForm firstStepProp={handleFirstStep} onBookingIdUpdate={handlePropsUpdate} />
                }
                {/* {thirdStepcompleted && !secondStepCompleted && (
                    <Approval />
                )} */}
                <div className='image-container' style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }}>
                    <img src={footerImage} alt="footer-image" style={{ height: "100px", width: "650px" }} />
                    <img src={footerImage} alt="footer-image" style={{ height: "100px", width: "650px" }} />
                </div>
            </div>
        </>
    )
}

export default ProgressBar
import React from 'react'
import './BookingDetails.scss';
import icon from './Booking Details Images/Logo-booking-details.jpg'

const BookingDetails = () => {
    return (
        <div className='booking-details-main'>
            <div className='booking-details-container'>
                <div className='header'>
                    <div className='header-left'>
                        <img src={icon} alt='logo' className='icon' />
                        <div className='logo-line'></div>
                        <div>
                            <p className='heading'>
                                Booking Details
                            </p>
                        </div>
                    </div>
                    <div className='header-right'>
                        <p>
                            <span className='query'>Need help with your trip?</span>
                            <br />
                            <span className='contact'>1234567890 | 0987654321 </span>
                            <br />
                            <span className='gmail'>abc@gmail.com</span>
                        </p>
                    </div>
                </div>
                <div className='line'></div>
                <div className='date-booking-id-container'>
                    <p className='booking-date'>
                        Sunday, November 12 2023
                    </p>
                    <p className='booking-id'>
                        <span className='booking-no'>Booking Number</span>
                        <br></br>
                        <span className='number'>12345PN0912</span>
                    </p>
                </div>
                <div className='line-01'></div>
                <div className='vehicle-details'>
                    <div className='vehicle-header'>
                        <p className='vehicle-heading'>Vehicle Details</p>
                    </div>
                </div>
                <div className='vehicle-timing-container'>
                    <div className='bus-name'>
                        <p className='bus-name-number'>
                            <span className='bus-number-header'>Bus Number : </span>
                            <a href="#"><span className='bus-number'>KA09EQ12349</span></a>
                            <br />
                            <span className='bus-name'>Semi-Sleeper A/C</span>
                        </p>
                    </div>
                    <div className='departure-date'>
                        <p className='from-date'>
                            <span className='departure'>From-Date : </span>
                            <span className='date'>02-10-2023</span>
                        </p>
                    </div>
                    <div className='to-date'>
                        <p className='to-date-arrival'>
                            <span className='arrival'>To-Date : </span>
                            <span className='arrival-date'>07-10-2023</span>
                        </p>
                    </div>
                </div>
                <div className='line'></div>
                <div className='driver-details'>
                    <div className='driver-header'>
                        <p className='driver-heading'>Driver Details</p>
                    </div>
                </div>
                <div className='driver-info-container'>
                    <div className='driver-info'>
                        <p className='driver'>
                            <span className='name'>Driver Name : </span>
                            <span className='driver-name'> Suresh M</span>
                        </p>
                    </div>
                    <div className='driver-contact'>
                        <p className='number'>
                            <span className='contact'>Contact No : </span>
                            <span className='driver-number'>8910098124</span>
                        </p>
                    </div>
                    <div className='driver-alternate'>
                        <p className='driver-alternate-number'>
                            <span className='alernative-number'>Alternate No : </span>
                            <span className='driver-alternative'>8910923712</span>
                        </p>
                    </div>
                </div>
                <div className='line'></div>
                <h2 className="hr-lines">Terms and Conditions</h2>
            </div>
        </div>
    )
}

export default BookingDetails
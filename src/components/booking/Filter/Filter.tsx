import './Filter.scss';
import filterIcon from '../../../assets/images/filter.png';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../booking-calendar/BookingCalendar.scss'
import { FaCalendar } from 'react-icons/fa';

const Filter: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [isACClicked, setIsACClicked] = useState(false);
    const [isNonACClicked, setNonACClicked] = useState(false);
    const [isSleeperClicked, setIsSleeperClicked] = useState(false);
    const [isNonSleeperClicked, setIsNonSleeperClicked] = useState(false);
    const [isAmenitiesClicked, setIsAmenitiesClicked] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isACButtonVisible, setIsACButtonVisible] = useState(true);
    const [isMinusIconClicked, setIsMinusIconClicked] = useState(false);

    {/* state variables for onclick event for Other Amenities Section */ }
    const [wifiClicked, setWifiClicked] = useState(false);
    const [chargeClicked, setChargeClicked] = useState(false);
    const [movieClicked, setMovieClicked] = useState(false);

    {/* Function to  Close POP-Up*/ }
    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowModal(false);
    }

    {/* Function to Clear Filter*/ }
    const handleClearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsACClicked(false);
        setNonACClicked(false);
        setIsSleeperClicked(false);
        setIsNonSleeperClicked(false);
    }

    {/* Function for AC Filters */ }
    const handleACClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsACClicked(!isACClicked);
    };

    {/* Function for Sleeper Filters */ }
    const handleSleeperClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsSleeperClicked(!isSleeperClicked);
    }

    {/* Function for Amenities Filters */ }
    const handleAmenitiesClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsAmenitiesClicked(!isAmenitiesClicked);
    }

    {/* Function for Wifi Clicked  */ }
    const handleWifiClicked = () => {
        setWifiClicked(!wifiClicked);
    }

    {/* Function for Charging Point Clicked  */ }
    const handleChargingPoint = () => {
        setChargeClicked(!chargeClicked);
    }

    {/* Function for Movie Clicked  */ }
    const handleMovieClicked = () => {
        setMovieClicked(!movieClicked)
    }

    const handleMinusIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsMinusIconClicked(true);
    };

    return (
        <>
            {/* Filter Button */}
            <div className="filter-container">
                <div className="filter-container-button-custom">
                    <button className="filter-button" onClick={() => setShowModal(true)}>
                        Filter
                        <img src={filterIcon} className='filter-icon' />
                    </button>
                </div>
                {/* POP-Up Page */}
                <div
                    className={`modal ${showModal ? 'show' : ''}`}
                    id="FilterModal"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden={!showModal}
                    style={{ display: showModal ? 'block' : 'none' }}
                >
                    <div className='modal-container'>
                        <div className="modal-header border-bottom-0 " style={{ paddingBottom: "2px", paddingTop: "20px" }}>
                            <p className='filter-modal'>FILTERS</p>
                            <button
                                type="button"
                                data-dismiss="modal"
                                className='cross-icon'
                                aria-label="Close"
                                onClick={() => setShowModal(false)}
                            >
                                <span aria-hidden="true">X</span>
                            </button>
                        </div>
                        <form>
                            <div className='form-content'>
                                {/* AC Filter */}
                                <div className='ac-section'>
                                    {!isACClicked && !isMinusIconClicked ? (
                                        <button className='ac-filter-button' onClick={handleACClick}>
                                            AC
                                            <svg className="plus-icon-ac" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12">
                                                <line x1="1" y1="6" x2="11" y2="6" stroke="#0f2454" strokeWidth="2" />
                                                <line x1="6" y1="1" x2="6" y2="11" stroke="#0f2454" strokeWidth="2" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <div className='checkbox-section-01'>
                                            <input type='checkbox' className='input-ac' />
                                            <label className='label-ac'>AC</label>
                                            <input type='checkbox' className='input-non-ac' />
                                            <label className='label-non-ac'>Non-AC</label>
                                            {!isMinusIconClicked && (
                                                <button onClick={handleMinusIconClick}>
                                                    <svg className="minus-icon-ac" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12">
                                                        <line x1="1" y1="6" x2="11" y2="6" stroke="#0f2454" strokeWidth="2" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    {/* <button className='ac-filter-button'
                                        onClick={handleACClick}>
                                        AC
                                        {isACClicked ? (
                                           
                                        ) : (
                                            <svg className="plus-icon-ac" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12">
                                                <line x1="1" y1="6" x2="11" y2="6" stroke="#0f2454" strokeWidth="2" />
                                                <line x1="6" y1="1" x2="6" y2="11" stroke="#0f2454" strokeWidth="2" />
                                            </svg>
                                        )}
                                    </button> */}
                                </div>
                                {/* Sleeper Filter */}
                                <div className='sleeper-section'>
                                    <button className='sleeper-filter-button' onClick={handleSleeperClick}>Sleeper
                                        {isSleeperClicked ? (
                                            <svg className="minus-icon-sleeper" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12">
                                                <line x1="1" y1="6" x2="11" y2="6" stroke="#0f2454" strokeWidth="2" />
                                            </svg>
                                        ) : (
                                            <svg className="plus-icon-sleeper" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12">
                                                <line x1="1" y1="6" x2="11" y2="6" stroke="#0f2454" strokeWidth="2" />
                                                <line x1="6" y1="1" x2="6" y2="11" stroke="#0f2454" strokeWidth="2" />
                                            </svg>
                                        )}
                                    </button>
                                    {isSleeperClicked && (
                                        <>
                                            <div className='checkbox-section-02'>
                                                <input className='input-semi-sleeper' type='checkbox' />
                                                <label className='label-semi-sleeper'>Semi-Sleeper</label>
                                                <input className='input-non-sleeper' type='checkbox' />
                                                <label className='label-non-sleeper'>Non-Sleeper </label>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {/* Amenities */}
                                {/* <div className='amenities-section'>
                                    <button className='amenities-filter-button' onClick={handleAmenitiesClicked}>Other Amenities
                                        {isAmenitiesClicked ? (
                                            <svg className="minus-icon-amenities" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12">
                                                <line x1="1" y1="6" x2="11" y2="6" stroke="#0f2454" strokeWidth="2" />
                                            </svg>
                                        ) : (
                                            <svg className="plus-icon-amenities" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12">
                                                <line x1="1" y1="6" x2="11" y2="6" stroke="#0f2454" strokeWidth="2" />
                                                <line x1="6" y1="1" x2="6" y2="11" stroke="#0f2454" strokeWidth="2" />
                                            </svg>
                                        )}
                                    </button>
                                    {isAmenitiesClicked && (
                                        <>
                                            <div className='section-1'>
                                                <p className={`wifi ${wifiClicked ? 'wifi-clicked' : ''}`}
                                                    onClick={handleWifiClicked} >
                                                    <i className="fa-solid fa-wifi"></i> WIFI
                                                </p>
                                                <p className={`charge ${chargeClicked ? 'charge-clicked' : ''}`}
                                                    onClick={handleChargingPoint} >
                                                    <i className="fa-solid fa-charging-station charge-icon"></i> Charging Point
                                                </p>
                                                <p className={`movie ${movieClicked ? 'movie-Clicked' : ''}`}
                                                    onClick={handleMovieClicked}>
                                                    <i className="fa-solid fa-video movie-icon"></i>Movie
                                                </p>
                                            </div>

                                        </>
                                    )}
                                </div> */}
                                <div className="calendar-container">
                                    <div className="from-to-date-container">
                                        <div className="date-picker">
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date: Date) => setStartDate(date)}
                                                selectsStart
                                                startDate={startDate}
                                                endDate={endDate}
                                                dateFormat="MM/dd/yyyy"
                                                placeholderText="From-Date"
                                                className="start-date"
                                            />
                                        </div>
                                        <div className="date-picker">
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date: Date) => setEndDate(date)}
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                                dateFormat="MM/dd/yyyy"
                                                placeholderText="To-Date"
                                                className="end-date"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Close Button */}
                                <div className='button-close-clear'>
                                    <button onClick={handleClose} className='button-close'>Done</button>
                                    <button className='button-clear' onClick={handleClearFilters}>Clear Filters</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Filter;

import './Filter.scss';
import filterIcon from './Filter Icon/Filter.png'
import React, { useState } from 'react';

const Filter: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [isACClicked, setIsACClicked] = useState(false);
    const [isNonAC, setNonACClicked] = useState(false);
    const [isSleeperClicked, setIsSleeperClicked] = useState(false);
    const [isNonSleeperClicked, setIsNonSleeperClicked] = useState(false);

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

    {/* Function for AC OnClick */ }
    const handleACClick = () => {
        setIsACClicked(!isACClicked);
    };

    {/* Function for Non-AC OnClick */ }
    const handleNonACClick = () => {
        setNonACClicked(!isNonAC);
    };

    {/* Function for Sleeper OnClick */ }
    const handleSleeperClick = () => {
        setIsSleeperClicked(!isSleeperClicked);
    }

    {/* Function for Non-Sleeper OnClick */ }
    const handleNONSleeperClick = () => {
        setIsNonSleeperClicked(!isNonSleeperClicked);
    }

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
                                className="close-button"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setShowModal(false)}
                            >
                                <span aria-hidden="true">X</span>
                            </button>
                        </div>
                        <form>
                            <div className='form-content'>
                                {/* AC Filter */}
                                <div className='ac-filter'>
                                    {/* Filters */}
                                    <>
                                        <p className={`button-ac-filter ${isACClicked ? 'ac-clicked' : ''}`} onClick={handleACClick}>AC</p>
                                        <p className={`button-non-ac-filter ${isNonAC ? 'non-ac-clicked' : ''}`} onClick={handleNonACClick}>Non-AC</p>
                                    </>
                                </div>
                                {/* Sleeper Filter */}
                                <div className='sleeper-filter'>
                                    {/* Filters */}
                                    <>
                                        <p className={`button-sleeper-filter ${isSleeperClicked ? 'sleeper-clicked' : ''}`} onClick={handleSleeperClick}>Semi-Sleeper</p>
                                        <p className={`button-non-sleeper-filter ${isNonSleeperClicked ? 'non-sleeper-clicked' : ''}`} onClick={handleNONSleeperClick}>Non-Sleeper</p>
                                    </>
                                </div>
                            </div>
                            {/* Close Button */}
                            <div className='button-close-clear'>
                                <button onClick={handleClose} className='button-close'>Done</button>
                                <button className='button-clear' onClick={handleClearFilters}>Clear Filters</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Filter;

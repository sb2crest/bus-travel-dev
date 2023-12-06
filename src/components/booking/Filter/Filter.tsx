import "./Filter.scss";
import filterIcon from "../../../assets/images/filter.png";
import React, { useState, Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../booking-calendar/BookingCalendar.scss";
import IFilterRequest from "../../../types/filter/request.type";
import dataService from "../../../services/data.service";
import { format } from "date-fns";
import ListVehicles from "../../../types/list.type";
import TuneIcon from "@mui/icons-material/Tune";

interface FilterProps {
  setVehicles: Dispatch<SetStateAction<ListVehicles[]>>;
}
const Filter: React.FC<FilterProps> = ({ setVehicles }: FilterProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isACClicked, setIsACClicked] = useState(false);
  const [isSleeperClicked, setIsSleeperClicked] = useState(false);
  // State variables for AC checkboxes
  const [isACAllChecked, setIsACAllChecked] = useState(false);
  const [isACChecked, setIsACChecked] = useState(false);
  const [isNonACChecked, setIsNonACChecked] = useState(false);

  // State variables for Sleeper checkboxes
  const [isSleeperAllChecked, setIsSleeperAllChecked] = useState(false);
  const [isSleeperChecked, setIsSleeperChecked] = useState(false);
  const [isSemiSleeperChecked, setIsSemiSleeperChecked] = useState(false);
  const [isNonSleeperChecked, setIsNonSleeperChecked] = useState(false);

  // State variables for fromDate and toDate
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  // State variable to store filter results
  const [filterResults, setFilterResults] = useState<any>(null);

  // Function to handle AC "All" checkbox change
  const handleACAllChange = () => {
    setIsACAllChecked(!isACAllChecked);
    setIsACChecked(!isACAllChecked);
    setIsNonACChecked(!isACAllChecked);
  };

  // Function to handle Sleeper "All" checkbox change
  const handleSleeperAllChange = () => {
    setIsSleeperAllChecked(!isSleeperAllChecked);
    setIsSleeperChecked(!isSleeperAllChecked);
    setIsSemiSleeperChecked(!isSleeperAllChecked);
    setIsNonSleeperChecked(!isSleeperAllChecked);
  };

  // Function to handle AC checkbox change
  const handleACChange = () => {
    setIsACChecked(!isACChecked);
    // Check if all individual checkboxes are selected
    if (isNonACChecked && !isACChecked) {
      setIsACAllChecked(true);
    } else {
      setIsACAllChecked(false);
    }
  };

  // Function to handle Non-AC checkbox change
  const handleNonACChange = () => {
    setIsNonACChecked(!isNonACChecked);
    // Check if all individual checkboxes are selected
    if (isACChecked && !isNonACChecked) {
      setIsACAllChecked(true);
    } else {
      setIsACAllChecked(false);
    }
  };

  // Function to handle Sleeper checkbox change
  const handleSleeperChange = () => {
    setIsSleeperChecked(!isSleeperChecked);
    // Check if all individual checkboxes are selected
    if (!isSleeperChecked && isSemiSleeperChecked && isNonSleeperChecked) {
      setIsSleeperAllChecked(true);
    } else {
      setIsSleeperAllChecked(false);
    }
  };

  // Function to handle Semi-Sleeper checkbox change
  const handleSemiSleeperChange = () => {
    setIsSemiSleeperChecked(!isSemiSleeperChecked);
    // Check if all individual checkboxes are selected
    if (isSleeperChecked && !isSemiSleeperChecked && isNonSleeperChecked) {
      setIsSleeperAllChecked(true);
    } else {
      setIsSleeperAllChecked(false);
    }
  };

  // Function to handle Non-Sleeper checkbox change
  const handleNonSleeperChange = () => {
    setIsNonSleeperChecked(!isNonSleeperChecked);
    // Check if all individual checkboxes are selected
    if (isSleeperChecked && isSemiSleeperChecked && !isNonSleeperChecked) {
      setIsSleeperAllChecked(true);
    } else {
      setIsSleeperAllChecked(false);
    }
  };

  const handleClose = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Collect selected options for AC
    const acOptions = [];
    if (isACChecked) {
      acOptions.push("AC");
    }
    if (isNonACChecked) {
      acOptions.push("NA");
    }
    if (!isACChecked && !isNonACChecked) {
      acOptions.push("ALL");
    }

    // Collect selected options for Sleeper
    const sleeperOptions = [];
    if (isSleeperChecked) {
      sleeperOptions.push("FS");
    }
    if (isSemiSleeperChecked) {
      sleeperOptions.push("SS");
    }
    if (isNonSleeperChecked) {
      sleeperOptions.push("NS");
    }
    if (!isSleeperChecked && !isSemiSleeperChecked && !isNonSleeperChecked) {
      sleeperOptions.push("ALL");
    }

    // Create a string with '/' between AC and Sleeper options
    const filter =
      acOptions.join(",") +
      (acOptions.length > 0 && sleeperOptions.length > 0 ? "/" : "") +
      sleeperOptions.join(",");
    console.log("filter:", filter);

    // Store fromDate and toDate in variables
    const selectedFromDate = fromDate ? format(fromDate, "dd-MM-yyyy") : null;
    const selectedToDate = toDate ? format(toDate, "dd-MM-yyyy") : null;
    console.log("selectedFromDate:", selectedFromDate);
    console.log("selectedToDate:", selectedToDate);

    try {
      let requestBody = {
        filter: filter,
        fromDate: selectedFromDate,
        toDate: selectedToDate,
      };
      const response = await dataService.filter(requestBody);
      const responseData = response.data;
      console.log(responseData);
      // Store the filter results in state
      setFilterResults(responseData);
      // setVehicles(responseData);

      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFromDateChange = (date: Date | null) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Date | null) => {
    setToDate(date);
  };

  // Function to Clear Filter
  const handleClearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsNonACChecked(false);
    setIsACChecked(false);
    setIsACAllChecked(false);
    setIsSleeperAllChecked(false);
    setIsSleeperChecked(false);
    setIsSemiSleeperChecked(false);
    setIsNonSleeperChecked(false);
    setFromDate(null);
    setToDate(null);
  };

  // Function for AC Filters
  const handleACClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsACClicked(!isACClicked);
  };

  // Function for Sleeper Filters
  const handleSleeperClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSleeperClicked(!isSleeperClicked);
  };

  return (
    <>
      {/* Filter Button */}
      <div className="filter-container">
        <div className="filter-container-button-custom">
          <button className="filter-button" onClick={() => setShowModal(true)}>
            Filter
            <TuneIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
        {/* POP-Up Page */}

        <div
          className={`modal ${showModal ? "show" : ""}`}
          id="FilterModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden={!showModal}
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-container">
            <div
              className="modal-header border-bottom-0 "
              style={{ paddingBottom: "2px", paddingTop: "20px" }}
            >
              <p className="filter-modal">FILTERS</p>
              <button
                type="button"
                data-dismiss="modal"
                className="cross-icon"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <form>
              <div className="form-content">
                {/* AC Filter */}
                <div className="ac-section">
                  <button className="ac-filter-button" onClick={handleACClick}>
                    AC
                    {isACClicked ? (
                      <svg
                        className="minus-icon-ac"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                      >
                        <line
                          x1="1"
                          y1="6"
                          x2="11"
                          y2="6"
                          stroke="#0f2454"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="plus-icon-ac"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                      >
                        <line
                          x1="1"
                          y1="6"
                          x2="11"
                          y2="6"
                          stroke="#0f2454"
                          strokeWidth="2"
                        />
                        <line
                          x1="6"
                          y1="1"
                          x2="6"
                          y2="11"
                          stroke="#0f2454"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </button>
                  {isACClicked && (
                    <>
                      <div className="checkbox-section-01">
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            id="allCheckbox"
                            className="input-all"
                            checked={isACAllChecked}
                            onChange={handleACAllChange}
                          />
                          <label className="label-all" htmlFor="allCheckbox">
                            All
                          </label>
                        </div>
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            id="acCheckbox"
                            className="input-ac"
                            checked={isACChecked}
                            onChange={handleACChange}
                          />
                          <label className="label-ac" htmlFor="acCheckbox">
                            AC
                          </label>
                        </div>
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            id="nonACCheckbox"
                            className="input-non-ac"
                            checked={isNonACChecked}
                            onChange={handleNonACChange}
                          />
                          <label
                            className="label-non-ac"
                            htmlFor="nonACCheckbox"
                          >
                            Non-AC
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* Sleeper Filter */}
                <div className="sleeper-section">
                  <button
                    className="sleeper-filter-button"
                    onClick={handleSleeperClick}
                  >
                    Sleeper
                    {isSleeperClicked ? (
                      <svg
                        className="minus-icon-sleeper"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        data-testid="minus-icon-sleeper"
                      >
                        <line
                          x1="1"
                          y1="6"
                          x2="11"
                          y2="6"
                          stroke="#0f2454"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="plus-icon-sleeper"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                      >
                        <line
                          x1="1"
                          y1="6"
                          x2="11"
                          y2="6"
                          stroke="#0f2454"
                          strokeWidth="2"
                        />
                        <line
                          x1="6"
                          y1="1"
                          x2="6"
                          y2="11"
                          stroke="#0f2454"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                  </button>
                  {isSleeperClicked && (
                    <>
                      <div className="checkbox-section-02">
                        <div className="checkbox">
                          {" "}
                          <input
                            id="allCheckbox"
                            className="input-all"
                            type="checkbox"
                            checked={isSleeperAllChecked}
                            onChange={handleSleeperAllChange}
                          />
                          <label className="label-all" htmlFor="allCheckboxsleeper">
                            All
                          </label>
                        </div>
                        <div className="checkbox">
                        <input
                          className="input-sleeper"
                          id="sleeperCheckbox"
                          type="checkbox"
                          checked={isSleeperChecked}
                          onChange={handleSleeperChange}
                        />
                        <label
                          className="label-sleeper"
                          htmlFor="sleeperCheckbox"
                        >
                          Sleeper
                        </label>
                        </div>
                        <div className="checkbox">
                        <input
                          className="input-semi-sleeper"
                          id="semiSleeperCheckbox"
                          type="checkbox"
                          checked={isSemiSleeperChecked}
                          onChange={handleSemiSleeperChange}
                        />
                        <label
                          className="label-semi-sleeper"
                          htmlFor="semiSleeperCheckbox"
                        >
                          Semi-Sleeper
                        </label>
                        </div>
                        <div className="checkbox">
                        <input
                          className="input-non-sleeper"
                          id="nonSleeperCheckbox"
                          type="checkbox"
                          checked={isNonSleeperChecked}
                          onChange={handleNonSleeperChange}
                        />
                        <label
                          className="label-non-sleeper"
                          htmlFor="nonSleeperCheckbox"
                        >
                          Non-Sleeper{" "}
                        </label>
                      </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="calendar-container">
                  <div className="from-to-date-container">
                    <div className="date-picker">
                      <DatePicker
                        selected={fromDate}
                        onChange={handleFromDateChange}
                        selectsStart
                        startDate={fromDate}
                        endDate={toDate}
                        dateFormat="dd-MM-yyyy"
                        placeholderText="From-Date"
                        className="start-date"
                        minDate={new Date()}
                        data-testid="date-item-1"
                      />
                    </div>
                    <div className="date-picker">
                      <DatePicker
                        selected={toDate}
                        onChange={handleToDateChange}
                        selectsEnd
                        startDate={fromDate}
                        endDate={toDate}
                        minDate={fromDate || new Date()}
                        dateFormat="dd-MM-yyyy"
                        placeholderText="To-Date"
                        className="end-date"
                      />
                    </div>
                  </div>
                </div>
                {/* Close Button */}
                <div className="button-close-clear">
                  <button onClick={handleClose} className="button-close">
                    Done
                  </button>
                  <button className="button-clear" onClick={handleClearFilters}>
                    Clear Filters
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Filter;

import { LoadScript, Autocomplete } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PlacesDate.scss";
import { Library } from "@googlemaps/js-api-loader";
import dataService from "../../../../services/data.service";
import ICalendarResponse from "../../../../types/availableSlots/response.type";

interface MySearchBoxOptions {
  types?: string[];
  componentRestrictions?: { country: string };
}
interface PlacesDateProps {
  vehicleNumber: string;
}
const libraries: Library[] = ["places"];

const PlacesDate: React.FC<PlacesDateProps> = ({ vehicleNumber }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isMultipleDestination, setMultipleDestination] = useState(false);
  const isFromDateSelected = startDate !== null;
  const [slots, setSlots] = useState<ICalendarResponse>({
    slots: {
      vehicleNumber: "",
      dates: [],
    },
  });

  const fromInputRef = useRef<google.maps.places.Autocomplete | null>(null);
  const toInputRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = (
    inputRef: React.MutableRefObject<google.maps.places.Autocomplete | null>
  ) => {
    if (inputRef.current) {
      const places = inputRef.current.getPlace();

      if (places && places.geometry && places.geometry.location) {
        console.log(places.formatted_address);
        console.log(places.geometry.location.lat());
        console.log(places.geometry.location.lng());
      } else {
        console.error("Invalid place object:", places);
      }
    }
  };

  const autocompleteOptions: MySearchBoxOptions = {
    types: ["geocode"],
    componentRestrictions: { country: "IN" },
  };

  const handleFromDate = (date: Date | null) => {
    setStartDate(date);
  };

  const handleToDate = (date: Date | null) => {
    setEndDate(date);
  };

  const handleRadioClick = () => {
    setMultipleDestination((prevValue) => {
      const newValue = !prevValue;
      return newValue;
    });
  };
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await dataService.availableSlots(vehicleNumber);
        const dates = response.data.slots.dates;
        setSlots((prevSlots) => ({
          ...prevSlots,
          slots: { ...prevSlots.slots, dates },
        }));
        console.log("Booked dates are", dates);
      } catch (error) {
        console.error("Error fetching available slots:", error);
      }
    };

    fetchSlots();
  }, [vehicleNumber]);

  const bookedDates = slots.slots.dates
    .filter((slot) => slot.isBooked)
    .map((bookedSlot) => new Date(bookedSlot.date));

  const isDayBlocked = (date: Date) => {
    return bookedDates.some((bookedDate) => {
      return (
        new Date(bookedDate.toDateString()).getTime() ===
        new Date(date.toDateString()).getTime()
      );
    });
  };

  return (
    <div className="destination">
      <h1>Fill the below details to Book</h1>
      <div className="destination_container">
        <div className="destination_container_section">
          <input
            type="radio"
            name="multipleDestination"
            checked={isMultipleDestination}
            onClick={handleRadioClick}
            onChange={handleRadioClick}
          />
          &nbsp;&nbsp;
          <label htmlFor="multipleDestination" className="multipleDestination">
            Multiple Destination
          </label>{" "}
          &nbsp;&nbsp;
          <span style={{ color: "#0f7bab" }}>
            (<u>Note</u>:&nbsp;Please select this option if you're traveling to
            multiple destinations)
          </span>
          <div className="destination_container_section_input">
            <form>
              <div className="search_bar">
                <div className="origin">
                  <LoadScript
                    googleMapsApiKey="AIzaSyBB6-8inLCozBj_SKuhrK0bhuO2Jxw35IU"
                    libraries={libraries}
                    region="IN"
                  >
                    <label htmlFor="from" style={{ display: "inline-flex" }}>
                    Origin
                    </label>
                    <Autocomplete
                      onLoad={(ref) => (fromInputRef.current = ref)}
                      onPlaceChanged={() => handlePlaceChanged(fromInputRef)}
                      options={
                        autocompleteOptions as google.maps.places.AutocompleteOptions
                      }
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ex:Bengaluru"
                      />
                    </Autocomplete>
                  </LoadScript>
                </div>
                <span className="material-symbols-outlined swapIcon">
                  sync_alt
                </span>
                <div className="destiny">
                  <LoadScript
                    googleMapsApiKey="AIzaSyBB6-8inLCozBj_SKuhrK0bhuO2Jxw35IU"
                    libraries={libraries}
                    region="IN"
                  >
                    <label htmlFor="to">Destination</label>

                    <Autocomplete
                      onLoad={(ref) => (toInputRef.current = ref)}
                      onPlaceChanged={() => handlePlaceChanged(toInputRef)}
                      options={
                        autocompleteOptions as google.maps.places.AutocompleteOptions
                      }
                    >
                      <input
                        type="text"
                        className="form-control To_place"
                        placeholder="Ex:Dharmasthala"
                        disabled={isMultipleDestination}
                      />
                    </Autocomplete>
                  </LoadScript>
                </div>
              </div>
              <div className="from-to-date-container">
                <div className="from-to-date-container-section">
                  <div className="From_section">
                    <label htmlFor="From-Date">From-Date</label>
                    <div className="date-picker">
                      <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => handleFromDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        className="form-control From_date"
                        minDate={new Date()}
                        highlightDates={bookedDates}
                        wrapperClassName="highlighted"
                        filterDate={(date: Date) => !isDayBlocked(date)}
                        dayClassName={(date) =>
                          isDayBlocked(date) ? "blocked-date" : ""
                        }
                      />
                      <i
                        className="fa-regular fa-calendar"
                        style={{ color: "#b3b3b3" }}
                      ></i>
                    </div>
                  </div>
                  <div className="To_section">
                    <label htmlFor="To-Date">To-Date</label>
                    <div className="date-picker">
                      <DatePicker
                        selected={endDate}
                        onChange={(date: Date) => handleToDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={
                          startDate ? new Date(startDate.getTime()) : new Date()
                        }
                        disabled={!isFromDateSelected}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        className="form-control To_date"
                      />
                      <i
                        className="fa-regular fa-calendar"
                        style={{ color: "#b3b3b3" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <button className="bookNow">Book Now</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesDate;

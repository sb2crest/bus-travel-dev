import React, { useEffect, useRef, useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PlacesDate.scss";
import { Library } from "@googlemaps/js-api-loader";
import dataService from "../../../services/data.service";

interface MySearchBoxOptions {
  types?: string[];
  componentRestrictions?: { country: string };
}

interface PlacesDateProps {
  filterData: string;
  onResponseDataChange: (responseData: any, selectedDateRange: any) => void;
}

const libraries: Library[] = ["places"];

const PlacesDate: React.FC<PlacesDateProps> = ({
  filterData,
  onResponseDataChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isMultipleDestination, setMultipleDestination] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceLatitude, setSourceLatitude] = useState(0);
  const [sourceLongitude, setSourceLongitude] = useState(0);
  const [destinationLatitude, setDestinationLatitude] = useState(0);
  const [destinationLongitude, setDestinationLongitude] = useState(0);
  const isFromDateSelected = startDate !== null;
  const fromInputRef = useRef<google.maps.places.Autocomplete | null>(null);
  const toInputRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const handlePlaceChanged = (
    inputRef: React.MutableRefObject<google.maps.places.Autocomplete | null>,
    setLatitude: React.Dispatch<React.SetStateAction<number>>,
    setLongitude: React.Dispatch<React.SetStateAction<number>>,
    setAddress: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (inputRef.current) {
      const places = inputRef.current.getPlace();

      if (places && places.geometry && places.geometry.location) {
        setAddress(places.formatted_address || "");
        setLatitude(places.geometry.location.lat() || 0);
        setLongitude(places.geometry.location.lng() || 0);
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
    setSelectedDateRange((prev) => ({ ...prev, startDate: date }));
  };
  const handleToDate = (date: Date | null) => {
    setEndDate(date);
    setSelectedDateRange((prev) => ({ ...prev, endDate: date }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setMultipleDestination(newValue);
    console.log(newValue);
  };
  const sendResponseDataToBooking = (responseData: any) => {
    console.log("Response data received in PlacesDate:", responseData);
    if (onResponseDataChange) {
      onResponseDataChange(responseData, selectedDateRange);
    }
  };

  const fetchData = async () => {
    try {
      const formattedStartDate = startDate ? formatDate(startDate) : null;
      const formattedEndDate = endDate ? formatDate(endDate) : null;
      const requestBody = {
        filter: filterData || "ALL/ALL",
        fromDate: formattedStartDate,
        toDate: formattedEndDate,
        distanceRequest: {
          source: source,
          destination: destination,
          sourceLatitude: sourceLatitude,
          sourceLongitude: sourceLongitude,
          destinationLatitude: destinationLatitude,
          destinationLongitude: destinationLongitude,
          multipleDestination: isMultipleDestination,
        },
      };
      const response = await dataService.filter(requestBody);
      console.log("API Response", response.data);
      sendResponseDataToBooking(response.data);
    } catch (error) {
      console.error("Error fetching available Vehicles:", error);
    }
  };

  useEffect(() => {
    if (filterData !== null) {
      fetchData();
      scrollToTop();
    }
  }, [filterData]);
  const scrollToTop = () => {
    window.scrollTo({ top: 600, behavior: "smooth" });
  };
  const exploreClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    fetchData();
  };
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleOriginPlaceChanged = () => {
    handlePlaceChanged(
      fromInputRef,
      setSourceLatitude,
      setSourceLongitude,
      setSource
    );
  };

  const handleDestinationPlaceChanged = () => {
    handlePlaceChanged(
      toInputRef,
      setDestinationLatitude,
      setDestinationLongitude,
      setDestination
    );
  };

  return (
    <div className="destination">
      <div className="destination_container">
        <div className="destination_container_section">
          <input
            type="checkbox"
            id="multipleDestination"
            checked={isMultipleDestination}
            onChange={handleCheckboxChange}
          />
          &nbsp;&nbsp;
          <label htmlFor="multipleDestination" className="multipleDestination">
            Multiple Destination
          </label>
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
                    <Autocomplete
                      onLoad={(ref) => (fromInputRef.current = ref)}
                      onPlaceChanged={handleOriginPlaceChanged}
                      options={
                        autocompleteOptions as google.maps.places.AutocompleteOptions
                      }
                    >
                      <input
                        type="text"
                        name="Origin"
                        className="form-control"
                        placeholder="Origin"
                      />
                    </Autocomplete>
                    <span className="material-symbols-outlined">near_me</span>
                  </LoadScript>
                </div>
                <div className="destiny">
                  <LoadScript
                    googleMapsApiKey="AIzaSyBB6-8inLCozBj_SKuhrK0bhuO2Jxw35IU"
                    libraries={libraries}
                    region="IN"
                  >
                    <Autocomplete
                      onLoad={(ref) => (toInputRef.current = ref)}
                      onPlaceChanged={handleDestinationPlaceChanged}
                      options={
                        autocompleteOptions as google.maps.places.AutocompleteOptions
                      }
                    >
                      <input
                        type="text"
                        name="Destination"
                        className="form-control To_place"
                        placeholder="Destination"
                        disabled={isMultipleDestination}
                      />
                    </Autocomplete>
                    <i
                      className="fa-solid fa-location-dot"
                      style={{ color: "#b3b3b3" }}
                    ></i>
                  </LoadScript>
                </div>
              </div>
              <div className="from-to-date-container">
                <div className="from-to-date-container-section">
                  <div className="From_section">
                    <div className="date-picker">
                      <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => handleFromDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="From-Date"
                        className="form-control From_date"
                        minDate={new Date()}
                        name="From-Date"
                        autoComplete="off"
                      />
                      <i
                        className="fa-regular fa-calendar"
                        style={{ color: "#b3b3b3" }}
                      ></i>
                    </div>
                  </div>
                  <div className="To_section">
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
                        placeholderText="To-Date"
                        className="form-control To_date"
                        name="To-Date"
                        autoComplete="off"
                      />
                      <i
                        className="fa-regular fa-calendar"
                        style={{ color: "#b3b3b3" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="buttonBooknow">
                <button className="bookNow" onClick={exploreClick}>
                  Explore
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesDate;

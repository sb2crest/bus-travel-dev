import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './BookingCalendar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

interface BookingCalendarProps {
  onSearch: (startDate: Date | null, endDate: Date | null) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onSearch }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSearch = () => {
    onSearch(startDate, endDate);
  };

  return (
    <div className="calendar-container">
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
         <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
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
         <FontAwesomeIcon icon={faCalendar} className="calendar-icon" /> 
      </div>
      <button className="button-search" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default BookingCalendar;

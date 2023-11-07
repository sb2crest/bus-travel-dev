import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './BookingCalendar.scss';
import { FaCalendar } from 'react-icons/fa';

const BookingCalendar: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
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
          <FaCalendar className="from-icon-calendar" />
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
          <FaCalendar className="to-icon-calendar" />
        </div>
      </div>
      <button className="button-search">Search</button>
    </div>
  );
};

export default BookingCalendar;

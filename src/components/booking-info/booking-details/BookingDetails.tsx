import React from 'react';
import './BookingDetails.scss';
import icon from '../../../assets/images/Logo.png';

interface BookingDetailsProps {
  bookingDetails: {
    bookingDate: string;
    bookingID: string;
    vehicleNumber: string;
    fromDate: string;
    toDate: string;
    driverName: string;
    driverNumber: string;
    alternateNumber: string;
  }[];
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ bookingDetails }) => {
    if (!bookingDetails || !Array.isArray(bookingDetails) || bookingDetails.length === 0) {
      // Handle the case where bookingDetails is empty or not an array
      return <div>No booking details available.</div>;
    }
  
    return (
      <div className='booking-details-main'>
        <div className='booking-details-container'>
          <div className='header'>
            <h1>Booking Details</h1>
          </div>
          <div className='details'>
            {bookingDetails.map((booking, index) => (
              // Render each booking detail here
              <div key={index} className='booking-item'>
              <p>Booking Date: {booking.bookingDate}</p>
              <p>Booking ID: {booking.bookingID}</p>
              <p>Vehicle Number: {booking.vehicleNumber}</p>
              <p>From Date: {booking.fromDate}</p>
              <p>To Date: {booking.toDate}</p>
              <p>Driver Name: {booking.driverName}</p>
              <p>Driver Number: {booking.driverNumber}</p>
              <p>Alternate Number: {booking.alternateNumber}</p>
            </div>
            ))}
          </div>
          <div className='icon'>
            <img src={icon} alt='Icon' />
          </div>
        </div>
      </div>
    );
  }
  

export default BookingDetails;

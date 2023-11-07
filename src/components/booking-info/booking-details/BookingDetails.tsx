import React from "react";
import "./BookingDetails.scss";
import icon from "../../../assets/images/Logo.png";

interface BookingDetailsProps {
    bookingDetails : any
//   bookingDetails: {
//     bookingDate: string;
//     bookingID: string;
//     vehicleNumber: string;
//     fromDate: string;
//     toDate: string;
//     driverName: string;
//     driverNumber: string;
//     alternateNumber: string;
//   };
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ bookingDetails}) => {
  return (
    <div className="booking-details-main">
      <div className="booking-details-container">
        <div className="header">
          <h1>Booking Details</h1>
          {/* <ul className="list-group">
            {bookingDetails.enquiryAndBookedList.map((booking: any, index: number) => (
              <li
                key={index}
              >
                {booking.bookingId}
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;

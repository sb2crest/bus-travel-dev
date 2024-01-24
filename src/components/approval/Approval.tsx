import React, { useState } from "react";
import "./Approval.scss";
import icon from "../../assets/images/blue-tick.jpg";

interface ApprovalProps {
  bookingid: string;
}

const Approval: React.FC<ApprovalProps> = ({ bookingid }) => {
  return (
    <div className="approval_container">
      <div className="approval_container_section">
        <div className="approval_container_section_summary">
          <div className="image_container">
            <img src={icon} />
          </div>
          <p className="header">Booking Confirmed!</p>
          <div className="content">
            <p className="booking_number">
              Your Booking Number is 
              <span className="bookingId"> {bookingid}</span>
            </p>
            <p className="queries">Got any Queries?</p>
            <div className="contact">
              <p className="phone">
                <i className="fa-solid fa-square-phone icon-phone"> </i> 
                &nbsp;7349368311
              </p>
              <p className="email">
                <i className="fa-solid fa-envelope icon-email"></i>
                &nbsp;info@seabed2crest.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Approval;

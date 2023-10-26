import React from "react";
import "./Card.scss";
import displayRazorpay from "./utils/PaymentGateway";

const Card = ({
  vehicleName,
  vehicleThumbnail,
  vehicleDetails,
  vehiclePrice,
}) => {
  return (
    <article className="card">
      <img src={vehicleThumbnail} alt={vehicleName} />
      <div className="card-content">
        <header className="card-header">
          <h5>{vehicleName}</h5>
        </header>
        <p>{vehicleDetails}</p>
        <h4>
          <span className="vehicle-price">₹{vehiclePrice}</span>{" "}
        </h4>
        <button
          type="button"
          onClick={displayRazorpay}
          className="vehicle-payment-button"
        >
          Buy Now
        </button>
      </div>
    </article>
  );
};

export default Card;



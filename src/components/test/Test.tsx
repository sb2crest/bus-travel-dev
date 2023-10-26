import React, { useEffect } from "react";
import "./Test.scss";
import Card from "./Card";

const Test = () => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
  

  return (
    <section className="card-list">
    <Card
      vehicleName="KA01AA0000"
      vehicleThumbnail="https://freepngimg.com/thumb/bus/8-2-bus-free-png-image.png"
      vehicleDetails="AC"
      vehiclePrice="2,999"
    />
    <Card
      vehicleName="KA01AA0001"
      vehicleThumbnail="https://freepngimg.com/thumb/bus/8-2-bus-free-png-image.png"
      vehicleDetails="Non AC"
      vehiclePrice="899"
    />
    <Card
      vehicleName="KA01AA0002"
      vehicleThumbnail="https://freepngimg.com/thumb/bus/8-2-bus-free-png-image.png"
      vehicleDetails="Sleeper"
      vehiclePrice="3,999"
    />
    <Card
      vehicleName="KA01AA0003"
      vehicleThumbnail="https://freepngimg.com/thumb/bus/8-2-bus-free-png-image.png"
      vehicleDetails="Sitting"
      vehiclePrice="899"
      />
  </section>
  );
};

export default Test;



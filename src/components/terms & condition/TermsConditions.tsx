import React from "react";
import { Link } from "react-router-dom";
import './TermsConditions.scss'
const TermsConditions = () => {
  return (
    <>
      <div className="tnc_container_banner">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>&#10095;</li>
          <li>Terms and Conditions</li>
        </ul>
      </div>
    </>
  );
};
export default TermsConditions;

import { Link } from "react-router-dom";
import "./TermsConditions.scss";
const TermsConditions = () => {
  return (
    <>
      <div className="tnc_container_banner">
        <h1>Terms and Conditions</h1>
        <h3>From Inquiries to Adventures, We're with You</h3>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>&#10095;</li>
          <li>Terms and Conditions</li>
        </ul>
      </div>
      <div className="tnc_container">
        <div className="tnc_container_list">
          <h1>Terms and Conditions </h1>
          <div className="tnc_container_list_items">
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using the NanduBus booking website, you agree to
              comply with and be bound by the following terms and conditions. If
              you do not agree with these terms, please do not use this website.
            </p>
            <h3>2. Booking Process</h3>
            <p>
              a. Users must provide accurate and complete information during the
              booking process.
            </p>
            <p>
              b. Users are responsible for verifying the accuracy of booking
              details before confirmation.
            </p>
            <p>
              c. NanduBus reserves the right to cancel or refuse any booking at
              its discretion.
            </p>
            <h3>3. Payments</h3>
            <p>
              a. Payment for bus bookings must be made through the approved
              payment methods on the website.
            </p>
            <p>
              b. Prices are subject to change without notice, and NanduBus is
              not responsible for any discrepancies.
            </p>
            <h3>4. Cancellations and Refunds</h3>
            <p>
              a. Cancellation policies vary by route and operator. Users are
              advised to review the specific cancellation policy associated with
              their booking.
            </p>
            <p>
              b. Refund requests must be made in accordance with the applicable
              cancellation policy.
            </p>
            <h3>5. User Accounts</h3>
            <p>
              a. Users are responsible for maintaining the confidentiality of
              their account information and passwords.
            </p>
            <p>
              b. Users are responsible for all activities that occur under their
              account.
            </p>
            <h3>6. Privacy Policy</h3>
            <p>
              a. All content on the NanduBus website, including text, graphics,
              logos, and images, is the property of NanduBus and is protected by
              intellectual property laws.
            </p>
            <h3>8. Limitation of Liability</h3>
            <p>
              a. NanduBus is not liable for any direct, indirect, incidental,
              special, or consequential damages arising from the use or
              inability to use the website or services.
            </p>
            <h3>9. Governing Law</h3>
            <p>
              {" "}
              These terms and conditions are governed by and construed in
              accordance with the laws of Indian Jurisdiction.
            </p>
            <h3>10. Changes to Terms</h3>
            <p>
              a. NanduBus reserves the right to modify or update these terms and
              conditions at any time without prior notice. Users are responsible
              for regularly reviewing these terms.
            </p>
            <p>
              By using the NanduBus bus booking website, you acknowledge that
              you have read, understood, and agree to be bound by these terms
              and conditions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default TermsConditions;

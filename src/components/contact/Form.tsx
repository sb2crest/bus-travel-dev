import React, { useState } from "react";
import { FaUser, FaEnvelope, FaComment } from "react-icons/fa";
import "./Form.scss";
import ConfirmationPopup from "./ConfirmationPopup";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    messageIconVisible: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "message") {
      setFormData({ ...formData, message: value, messageIconVisible: false });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
      messageIconVisible: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmationOpen(true);
    resetForm();
    console.log(formData);
  };

  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div className="contact-form-area">
      <div className="sec-title text-center">
        <div className="sub-title">Write Here</div>
        <h2>Get In Touch</h2>
      </div>
      <div className="contact-form">
        <form method="post" action="" id="contact-form">
          <div className="row clearfix">
            <div className="col-md-6 form-group">
              <label htmlFor="name">Enter your name</label>
              <input
                type="text"
                name="user_name"
                id="name"
                placeholder="Enter name here......"
              />
              <i className="fas fa-user"></i>
            </div>

            <div className="col-md-6 form-group">
              <label htmlFor="email">Enter your email</label>
              <input
                type="email"
                name="user_email"
                id="email"
                placeholder="Enter email here......"
              />
              <i className="fas fa-envelope"></i>
            </div>

          </div>
          
          <div className="col-md-12 form-group">
              <label htmlFor="message">Enter your message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Enter message here......"
              ></textarea>
              <i className="fas fa-edit"></i>
            </div>

           
          <div className="col-md-12 form-group">
              <button
                className="theme-btn btn-style-one"
                type="submit"
                name="submit-form"
              >
                <span className="btn-title">Get In Touch</span>
              </button>{" "}
            </div>
        </form>
        <ConfirmationPopup
          isOpen={isConfirmationOpen}
          content={[
            <>
              <div className="close-icon close custom" onClick={handleCancel}>
                <i className="fas fa-times"></i>
              </div>
              <div className="thank-you-container">
                {/* Icon with tick mark inside a circle */}
                <div className="icon-container">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="thank-you">
                  <p>Thank You!</p>
                </div>
              </div>
              <div className="get-back">
                <p>We will get back to you shortly</p>
              </div>
            </>,
          ]}
        />
      </div>
    </div>
  );
};

export default Form;

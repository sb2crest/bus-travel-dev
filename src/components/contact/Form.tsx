import React, { useState } from "react";
import { FaUser, FaEnvelope, FaComment } from "react-icons/fa";
import "./Form.scss";
import IGetInTouch from "../../types/getInTouch.type";
import dataService from "../../services/data.service";
import ConfirmationPopup from "./ConfirmationPopup";
import axios from "axios";

const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  };
  const getInTouch=(e: React.FormEvent)=>{
    e.preventDefault();
    const  requestBody={
      name:name ,
      email:email ,
      message: message
    }
    console.log({requestBody})
    dataService
    .getInTouch (requestBody)
    .then((response: { data: any }) => {
      console.log(response);
      setIsConfirmationOpen(true); 
      resetForm()
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
  }

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
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="name"
                placeholder="Enter name here......"
              />
              <i className="fas fa-user"></i>
            </div>

            <div className="col-md-6 form-group">
              <label htmlFor="email">Enter your email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Enter message here......"
            ></textarea>
            <i className="fas fa-edit"></i>
          </div>

          <div className="col-md-12 form-group">
            <button
              className="theme-btn btn-style-one"
              type="submit"
              name="submit-form"
              onClick={getInTouch}
            >
              <span className="btn-title">Get In Touch</span>
            </button>{" "}
          </div>
        </form>
        <ConfirmationPopup
          isOpen={isConfirmationOpen}
          content={[
            <>
              {/* <div className="close-icon close custom" onClick={handleCancel}>
                <i className="fas fa-times"></i>
              </div> */}
              <div className="thank-you-container">
                <div className="icon-container">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="thank-you">
                  <p>Thank You!</p>
                </div>
              </div>
              <div className="get-back">
                <p>We will get back to you shortly</p>
                <button className="done" onClick={handleCancel}>Done</button>
              </div>
            </>,
          ]}
        />
      </div>
    </div>
  );
};

export default Form;

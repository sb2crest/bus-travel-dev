import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaComment } from 'react-icons/fa';
import './Form.css'
import ConfirmationPopup from './ConfirmationPopup';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Contact from './Images/Contact.jpg'


const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    messageIconVisible: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'message') {
      setFormData({ ...formData, message: value, messageIconVisible: false });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
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
    <div className="custom-container">
      <div className='center-text'>
        <h1 className='touch-custom'>Get In Touch</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="custom-input">
          <div className="custom-row">
            <div className="custom-col">
              <div className="custom-input-group form-custom-name">
              
                <input
                  type="text"
                  className="form-control-custom "
                  id="name"
                  name="name"
                  placeholder=" Enter your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                 <div className="input-icon-name">
                  <FaUser />
                </div>
              </div>
             
            </div>
            <div className="custom-col">
              <div className="custom-input-group form-custom-email">
                <input
                  type="email"
                  className="form-control-custom custom-email"
                  id="email"
                  name="email"
                  placeholder=" Enter your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                
              </div>
              <div className="input-icon-email">
                  <FaEnvelope />
                </div> 
              
            </div>
          </div>
        </div>

        <div className="custom-input form-custom-message">
          <textarea
            className="form-control-custom"
            id="message"
            name="message"
            placeholder="Enter your Message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            onFocus={() => setFormData({ ...formData, messageIconVisible: false })}
            onBlur={() => setFormData({ ...formData, messageIconVisible: true })}
            required
          />
        </div>
        <button type="submit" className="custom-button">
          Get in Touch
        </button>
      </form>
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        content={[
          <>
            <div className='close-icon close custom' onClick={handleCancel}>
              <i className="fas fa-times"></i>
            </div>
            <div className='thank-you-container'>
              {/* Icon with tick mark inside a circle */}
              <div className='icon-container'>
                <i className="fas fa-check-circle"></i>
              </div>
              <div className='thank-you'>
                <p>Thank You!</p>
              </div>
            </div>
            {/* <div className='appreciate'>
              <p>We appreciate that you have taken the time to write us.</p>
            </div> */}
            <div className='get-back'>
              <p>We will get back to you shortly</p>
            </div>
          </>
        ]}
      />
      {/* <div className="col-md-6 col-md-6-custom">
        <img
          src={Contact}
          alt="Contact"
          className="img-fluid"
        />
      </div> */}
    </div>

  );
};

export default Form;
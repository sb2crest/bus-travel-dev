import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contact.css';


const Contact = () => {
  const blueIconStyle = {
    color: '#007acc',
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center border-secondary d-flex flex-column h-100 ">
            <div className="card-body  ">
              <i className="fas fa-envelope fa-6x" style={{ ...blueIconStyle, marginTop: '1px' }}></i>
              <h5 className="card-title mt-3">Email</h5>
              <p className="card-text">info@seabed2crest.com</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center border-secondary d-flex flex-column h-100" >
            <div className="card-body">
              <i className="fas fa-phone fa-6x " style={{ ...blueIconStyle, marginBottom: '1px' }}></i>
              <h5 className="card-title mt-3">Phone</h5>
              <p className="card-text" >+91 7349368311</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center border-secondary d-flex flex-column h-100">
            <div className="card-body">
              <i className="fas fa-map-marker-alt fa-6x" style={{ ...blueIconStyle, marginBottom: '1px' }}></i>
              <h5 className="card-title mt-3">Address</h5>
              <p className="card-text">102, 1st floor, AjjeGowdru Nilaya, 7th A Cross Rd, Yelahanka Satellite Town, Yelahanka, Bengaluru, Karnataka 560064</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
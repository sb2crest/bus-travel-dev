// import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import ContactUs from './components/contact/ContactUs';
import Footer from './components/footer/Footer';
import AboutUs from './components/about/AboutUs';
import Navbar from './components/navbar/Navbar';
import { useState, useEffect } from 'react'
import Preloader from './components/preloader/Preloader';
import Booking from './components/booking/Booking';
import BookingInfo from './components/booking-info/BookingInfo';
import BookVehicle from './components/booking/book-vehicle/BookVehicle';
import VehicleInfo from './components/vehicle/vehicle-info/VehicleInfo';
import ProgressBar from './components/progress bar/ProgressBar';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loader = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    };
    loader();
  }, []);
  return isLoading ?
    (<Preloader />) :
    (
      <Router>
        <Navbar />
        <div className='containers'>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/booking" component={Booking} />
            <Route exact path="/bookinginfo" component={BookingInfo} />
            <Route exact path="/vehicleinfo" component={VehicleInfo} />
            <Route exact path="/bookVehicle" component={BookVehicle} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/progressbar" component={ProgressBar} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
};
export default App;

// import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import image1 from './assets/images/img_1.jpg';
import image2 from './assets/images/img_2.jpg';
import image3 from './assets/images/img_3.jpg';
import image4 from './assets/images/img_4.jpg';
import Home from './components/home/Home';
import ContactUs from './components/contact/ContactUs';
import Footer from './components/footer/Footer';
import AboutUs from './components/about/AboutUs';
import Navbar from './components/navbar/Navbar';
import { useState, useEffect } from 'react'
import Preloader from './components/preloader/Preloader';
import Booking from './components/booking/Booking';
import BookingInfo from './components/booking-info/BookingInfo';
import VehiclesList from './components/vehicle/vehicle-list/VehicleList';
import BookVehicle from './components/booking/book-vehicle/BookVehicle';
import VehicleInfo from './components/vehicle/vehicle-info/VehicleInfo';
import BookingDetails from './components/booking-info/booking-details/BookingDetails';

const images = [
  { url: image1 },
  { url: image2 },
  { url: image3 },
  { url: image4 },
];

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
            <Route exact path="/vehicles" component={VehiclesList} />
            {/* <Route exact path="/addVehicle" component={AddVehicle} /> */}
            <Route exact path="/booking" component={Booking} />
            <Route exact path="/bookinginfo" component={BookingInfo} />
            {/* <Route path='/bookinginfo' component={BookingDetails} /> */}
            <Route exact path="/vehicleinfo" render={(props) => (<VehicleInfo {...props} images={images} />
            )}
            />
            <Route exact path="/bookVehicle" component={BookVehicle} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/aboutus" component={AboutUs} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
};
export default App;

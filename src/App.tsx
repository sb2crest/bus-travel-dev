import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AddVehicle from './components/AddVehicle';
import ContactUs from './components/contact/ContactUs';
import VehiclesList from './components/VehicleList';
import Vehicle from './components/Vehicle';
import BookVehicle from './components/BookVehicle';
import Footer from './components/footer/Footer';
import image1 from './assets/images/img_1.jpg';
import image2 from './assets/images/img_2.jpg';
import image3 from './assets/images/img_3.jpg';
import image4 from './assets/images/img_4.jpg';
import Home from './components/home/Home';
import List from './components/vehicle/vehicle list/List';
import VehicleInfo from './components/vehicle/vehicle info/VehicleInfo';
import AboutUs from './components/about/AboutUs';
import Navbar from './components/navbar/Nav';
import { useState, useEffect } from 'react'
import Preloader from './components/preloader/Preloader';
import BookingInfo from './components/booking info/BookingInfo';
import BookingDetails from './components/booking info/Booking Details/BookingDetails';
import Test from './components/test/Test';


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
            <Route exact path="/addVehicle" component={AddVehicle} />
            <Route exact path="/List" component={List} />
            <Route exact path="/bookinginfo" component={BookingInfo} />
            <Route path='/booking-details' component={BookingDetails} />
            <Route exact path="/vehicleinfo" render={(props) => (<VehicleInfo {...props} images={images} />
            )}
            />
            <Route path="/vehicles/:id" component={Vehicle} />
            <Route exact path="/bookVehicle" component={BookVehicle} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/test" component={Test} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
};

export default App;

import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AddVehicle from './components/AddVehicle';
import ContactUs from './components/contact/ContactUs';
import VehiclesList from './components/VehicleList';
import Vehicle from './components/Vehicle';
import BookVehicle from './components/BookVehicle';
import Login from './components/Login/Login';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import image1 from './assets/images/img_1.jpg';
import image2 from './assets/images/img_2.jpg';
import image3 from './assets/images/img_3.jpg';
import image4 from './assets/images/img_4.jpg';
import Home from './components/home/Home';
import Booking from './components/booking/Booking';
import VehicleInfo from './components/VehicleInfo';
import AboutUs from './components/about/AboutUs';



const images = [
  { url: image1 },
  { url: image2 },
  { url: image3 },
  { url: image4 },
];

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/vehicles" component={VehiclesList} />
          <Route exact path="/addVehicle" component={AddVehicle} />
          <Route exact path="/booking" component={Booking} />
          <Route exact path="/vehicleinfo" render={(props) => (<VehicleInfo {...props} images={images} />
            )}
          />
          <Route path="/vehicles/:id" component={Vehicle} />
          <Route exact path="/bookVehicle" component={BookVehicle} />
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

import React from 'react'
import Logo from "../../assets/images/Logo.png";
import { NavLink } from "react-router-dom";
import './Header.scss'
const Header = () => {
  return (
    <div className="header">
    <div className="header_container">
      <nav>
        <div className="logo">
          <img src={Logo} alt="Logo" width={100} />
        </div>
        <div className="nav_items">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/aboutus">About Us</NavLink>
            </li>
            <li>
              <NavLink to={"/booking"}>Booking</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>Booking info</NavLink>
            </li>
            <li>
              <NavLink to={"/contactus"}>Contact us</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    </div>
      )
}

export default Header
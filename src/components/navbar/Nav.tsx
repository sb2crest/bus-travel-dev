import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navitems } from "./Navitems";
import "./Nav.scss";
import logo from "../../assets/images/Logo.png";
import Fade from 'react-reveal/Fade';
const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const menuList = Navitems.map(({ url, title, imgSrc }, index) => {
    const isUrlDefined = typeof url === "string";
    return (
      <li key={index} onClick={() => setClicked(false)}>
        {isUrlDefined ? (
          <NavLink exact to={url!} activeClassName="active">
            {title}
          </NavLink>
        ) : (
          <span>{title}</span>
        )}
        {imgSrc && (
          <img src={logo} alt="Menu Image" width={90} className="hideimg" height={90}/>
        )}
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="header">
      <div className="header_container">
      <Fade top>
        <nav>
          <div className="logo">
            <img src={logo} alt="Logo" width={60} />
          </div>
          <div className="menu-icon" onClick={handleClick}>
            <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <div className="ul">
            <ul className={clicked ? "menu-list" : "menu-list close"}>
              {menuList}
              <li className="hidecontact" onClick={() => setClicked(false)}>
                <NavLink to={"/contactus"}>Contact Us</NavLink>
              </li>

              <li>
                <NavLink to={"/contactus"} >
                  <button className="button-89" role="button">
                    <i
                      className="fa-solid fa-phone fa-md"
                      style={{ color: "#0f7bab" }}
                    ></i>
                    &nbsp;&nbsp;Contact Us
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        </Fade>
      </div>
    </div>
  );
};

export default Navbar;

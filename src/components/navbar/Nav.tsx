import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navitems } from "./Navitems";
import "./Nav.scss";
import logo from "../../assets/images/Logo.png";
const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const menuList = Navitems.map(({ url, title, imgSrc }, index) => {
    const isUrlDefined = typeof url === "string";
    return (
      <li key={index}>
        {isUrlDefined ? (
          <NavLink exact to={url!} activeClassName="active">
            {title}
          </NavLink>
        ) : (
          <span>{title}</span>
        )}
        {imgSrc && (
          <img src={imgSrc} alt="Menu Image" width={90} className="hideimg" />
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
              <li className="hidecontact">
                <NavLink to={"/contactus"}>Contact Us</NavLink>
              </li>

              <li>
                <NavLink to={"/contactus"}>
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
      </div>
    </div>
  );
};

export default Navbar;

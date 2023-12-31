import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navitems } from "./NavItems";
import "./Navbar.scss";
import logo from "../../assets/images/Logo.png";
import Fade from "react-reveal/Fade";

export const scrollToTop = () => {
  let scrollToPercentage;

  if (window.innerWidth >= 1200) {
    scrollToPercentage = 80;
  } else if (window.innerWidth >= 768) {
    scrollToPercentage = 68;
  } else {
    scrollToPercentage = 51;
  }
  const windowHeight = window.innerHeight;
  window.scrollTo({
    top: (windowHeight * scrollToPercentage) / 100,
    behavior: "smooth",
  });
};
const Navbar = React.memo(() => {
  const [clicked, setClicked] = useState(false);
  const menuList = Navitems.map(({ url, title, imgSrc }, index) => {
    const isUrlDefined = typeof url === "string";
    return (
      <li key={index} onClick={() => setClicked(false)}>
        {isUrlDefined ? (
          <NavLink
            exact
            to={url!}
            activeClassName="active"
            onClick={scrollToTop}
          >
            {title}
          </NavLink>
        ) : (
          <span>{title}</span>
        )}
        {imgSrc && (
          <img
            src={logo}
            alt="Menu Image"
            width={90}
            className="hideimg"
            height={90}
          />
        )}
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="header" data-testid="navbar">
      <div className="header_container">
        <Fade top>
          <nav>
            <div className="logo">
              <NavLink to={"/"}>
                <img src={logo} alt="Logo" width={60} />
              </NavLink>
            </div>
            <div
              className="menu-icon"
              onTouchStart={handleClick}
              data-testid="menu-icon"
            >
              <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <div className="ul">
              <ul
                className={clicked ? "menu-list active" : "menu-list close"}
                data-testid="menu-list"
              >
                {" "}
                {menuList}
                <li
                  className="hidecontact"
                  onClick={() => setClicked(false)}
                  data-testid="hidecontact"
                >
                  <NavLink to={"/contactus"} onClick={scrollToTop}>
                    Contact Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/contactus"} onClick={scrollToTop}>
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
});

export default Navbar;

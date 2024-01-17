import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navitems } from "./NavItems";
import "./Navbar.scss";
import logo from "../../assets/images/Logo.png";
import Fade from "react-reveal/Fade";

export const scrollToTop: React.MouseEventHandler<HTMLAnchorElement> = (
  event
) => {
  let scrollToPercentage;
  const isHome = event.currentTarget.getAttribute("data-is-home") === "true";

  if (isHome) {
    scrollToPercentage = 0;
  } else if (window.innerWidth >= 1200) {
    scrollToPercentage = 76;
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

export const scrollToTopBooking: React.MouseEventHandler<HTMLAnchorElement> = (
  event
) => {
  const bookingScrollPercentage =  16;
  const windowHeight = window.innerHeight;
  window.scrollTo({
    top: (windowHeight * bookingScrollPercentage) / 100,
    behavior: "smooth",
  });
};

const Navbar = React.memo(() => {
  const [clicked, setClicked] = useState(false);

  const menuList = Navitems.map(({ url, title, imgSrc }, index) => {
    const isUrlDefined = typeof url === "string";
    const isHome = title === "Home";

    let onClickHandler: React.MouseEventHandler<HTMLAnchorElement>;

    if (isHome) {
      onClickHandler = scrollToTop;
    } else if (title === "Booking") {
      onClickHandler = scrollToTopBooking; 
    } else {
      onClickHandler = (event) => {
        scrollToTop(event); 
        setClicked(false);
      };
    }

    return (
      <li key={index} onClick={() => setClicked(false)}>
        {isUrlDefined ? (
          <NavLink
            exact
            to={url!}
            activeClassName="active"
            onClick={(event) => {
              onClickHandler(event);
              setClicked(false);
            }}
            data-is-home={isHome}
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
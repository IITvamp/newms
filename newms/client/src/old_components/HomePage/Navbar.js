import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import { Button } from "@material-ui/core";
import Bars from "./Assets/bars.svg";
import Logo from "./Assets/Logo.png";
import Logo1 from "../Assets/Logo1.png";

function NavbarNew(props) {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  // const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);

  // const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 780) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const changeBackground = () => {
    if (window.scrollY >= 75) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="homepage-navbar" onClick={(e) => e.stopPropagation()}>
        <div className="homepage-nav-container">
          <NavLink exact to="/" className="homepage-nav-logo">
            <img src={Logo1} alt={"brand logo"}/>
          </NavLink>
          <ul
            className={click ? "homepage-nav-menu active" : "homepage-nav-menu"}
          >
            <li className="homepage-nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="homepage-nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className="homepage-nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="homepage-nav-links"
                onClick={click ? handleClick : null}
              >
                About
              </NavLink>
            </li>
            <li className="homepage-nav-item">
              <NavLink
                exact
                to="/login"
                activeClassName="active"
                className="homepage-nav-links"
                onClick={click ? handleClick : null}
              >
                SignIn
              </NavLink>
            </li>
            <li className="homepage-nav-item">
              <NavLink
                exact
                to="/register"
                activeClassName="active"
                className="homepage-nav-links"
                onClick={click ? handleClick : null}
              >
                SignUp
              </NavLink>
            </li>
          </ul>
          <div className="homepage-nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarNew;
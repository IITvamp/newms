import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
// import {ChatIcon} from "@material-ui/icons";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";

const Menu = () => {
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "AnanomMessage", icon: "chat", path: "/ananommessage" },
    { label: "Discover", icon: "explore", path: "/discover" },
  ];

  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  useEffect(() => {
    const newArr = notify.data.filter((item) => item.isRead === false);
    setUnreadNotifications(newArr)
  }, [notify])

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row mb-2 mb-lg-0">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
            <Link className={`nav-link `} to={link.path}>
              <span className={`material-icons `}>{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{ opacity: "1" }}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span
              style={{ color: notify.data.length > 0 ? "var(--c1)" : "" }}
              className={`material-icons `}
            >
              notifications
            </span>
            <span className="notify_length">{unreadNotifications.length}</span>
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <NotifyModal />
          </div>
        </li>

        <li className="nav-item dropdown" style={{ opacity: "1" }}>
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size="medium-avatar" />
          </span>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <Link
                style={{ color: "white" }}
                className="dropdown-item"
                to={`/profile/${auth.user._id}`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                style={{ color: "white" }}
                className="dropdown-item"
                to={`/message`}
              >
                Chat
              </Link>
            </li>
            <li>
              <Link
                style={{ color: "white" }}
                className="dropdown-item"
                to={`/savemessage`}
              >
                Saved Conversations
              </Link>
            </li>
            <li>
              <label
                style={{ color: "white" }}
                htmlFor="theme"
                className="dropdown-item"
                onClick={() =>
                  dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
                }
              >
                {theme ? "Light mode" : "Dark mode"}
              </label>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <Link
                style={{ color: "white" }}
                className="dropdown-item"
                to="/"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;

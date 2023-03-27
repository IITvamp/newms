import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";
import Logo1 from "../Assets/Logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../../redux/actions/postAction';
import { getSuggestions } from '../../redux/actions/suggestionsAction';


const Header = () => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleRefreshHome = () => {
    window.scrollTo({top: 0})
    dispatch(getPosts(auth.token));
    dispatch(getSuggestions(auth.token));
  };

  return (
    <div className="header bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <div className="container-fluid">
          <Link to="/" className="logo" onClick={handleRefreshHome}>
            <img src={Logo1} alt={"brand logo"} style={{height:"4.5rem"}}/>

            {/* <h1 className="navbar-brand text-uppercase p-0 m-0">DatingInsta</h1> */}
          </Link>

          <Search />

          <Menu />
        </div>
      </nav>
    </div>
  );
};

export default Header;

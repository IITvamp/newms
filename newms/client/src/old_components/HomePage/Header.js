import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
// import { Button } from './Button';

function Header() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const signUpClick = () => {
    window.location.href="/register"
  }

//    style={{ transform: `translateY(-${offsetY * 0.4}px)` }}
//   style={{color: `rgba(255, 255, 255, ${1/2(offsetY +1)})`}}

  return (
    <div className="homepage-header-main">
      <div
        style={{ transform: `translateY(-${offsetY * 0.4}px)` }}
        className="head-container"
      >
        <h1 className="head-container-heading">UNWIND YOURSELF</h1>
        <p className="head-container-paragraph">
          Welcome to the world of conversing without hesitation and judgement.
        </p>
        <div>
          <div>
            <Link to="/register" style={{ color: "crimson" }}>
              <button id="getStarted">SignUp</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

import React from "react";
import Navbar from "../components/header";
import Header from "../old_components/HomePage/Header";
import Content from "../old_components/HomePage/Content";
import NavbarNew from "../old_components/HomePage/Navbar";
import HomePageNavbar from "../old_components/HomePage/HomePage_Navbar";
import Newscard from "../components/newscard";
// import Footer from "../Footer/Footer";

function HomePage() {
  return (
    <div>
      <div id="home_fix">
        <Navbar />
        {/* <Newscard/> */}
        {/* <Header /> */}
        <Content />
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default HomePage;

// import React, {useEffect, useState} from "react";
// import { ReactNavbar } from "react-responsive-animate-navbar";
// import { useLocation } from "react-router-dom";
// // import HomePage from "../../pages/homepage";
// import Login from "../../pages/login";
// import Register from "../../pages/register";
// import Logo1 from "../Assets/Logo1.png";

// const HomePageNavbar = () => {

//     console.log(window.location.href);
//   const location = useLocation();
//   const url = window.location.href;
//     useEffect(() => {
//       console.log(location.pathname);
//       console.log(window.location.href);
//     }, [url, location.pathname]);
//     // console.log(location.pathname)
//     // console.log(window.location.href);

//     // if (window.location.href === "") {
        
//     // }
//     return (
//       <ReactNavbar
//         color="rgb(25, 25, 25)"
//         logo={Logo1}
//         menu={[
//           { name: "ABOUT US", to: "/about" },
//           { name: "SIGNUP", to: "/register", component: Register },
//           { name: "LOGIN", to: "/login", component: Login },
//         ]}
//         social={[
//           {
//             name: "Linkedin",
//             url: "https://www.linkedin.com/in/nazeh-taha/",
//             icon: ["fab", "linkedin-in"],
//           },
//           {
//             name: "Facebook",
//             url: "https://www.facebook.com/nazeh200/",
//             icon: ["fab", "facebook-f"],
//           },
//           {
//             name: "Instagram",
//             url: "https://www.instagram.com/nazeh_taha/",
//             icon: ["fab", "instagram"],
//           },
//           {
//             name: "Twitter",
//             url: "http://nazehtaha.herokuapp.com/",
//             icon: ["fab", "twitter"],
//           },
//         ]}
//       />
//     );

// }

// export default HomePageNavbar;;

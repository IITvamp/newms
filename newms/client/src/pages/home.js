import React from "react";
import { useSelector } from "react-redux";

import Posts from "../old_components/home/Posts";
import Status from "../old_components/home/Status";
import RightSideBar from "../old_components/home/RightSideBar";

import LoadIcon from "../images/loading.gif";

const Home = () => {
  const { homePosts, userType } = useSelector((state) => state);
  return (
    <div className="home row mx-0">
      <div className="w-full sm:w-1/2 md:w-2/5 sm:m-4 mx-auto">
        {<Status />}
        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 ? (
          <h2 className="text-center">No Post</h2>
        ) : (
          <Posts />
        )}
      </div>

      {/* <div className="col-md-4">
        <RightSideBar />
      </div> */}
    </div>
  );
};

export default Home;

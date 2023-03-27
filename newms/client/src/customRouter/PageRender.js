import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFound from "../old_components/NotFound";

const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);

  let pageName = "";
  if (auth.token) {
    if (id) {
      console.log(page, id);
      pageName = `${page}/[id]`;
    } else {
      console.log(page);
      pageName = `${page}`;
    }
  }

  return generatePage(pageName);
};

export default PageRender;

import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

const FindButton = (props) => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (props.bcode === 2) {
      setName("Loading");
      setClassName("ui loading button large");
      props.setBcode(null);
    } else if (props.bcode === 1) {
      setName("End Chat");
      setClassName("ui button end");
    } else if (props.bcode === 3) {
      setName("Find New");
      setClassName("ui button find");
    }
  }, [props]);

  const onClickHandler = () => {
    console.log(props);
    if (props.bcode == null) {
      props.setFind(true);
      console.log("Find button clicked");
    } else if (className === "ui button end") {
      console.log(props.end);
      props.setEnd(true);
      console.log("end chat clicked");
    } else if (className === "ui button find") {
      props.setFind(true);
      console.log("Find button clicked");
    }
  };

  return <Button onClick={onClickHandler}>{name ? name : "Start"}</Button>;
};

export default FindButton;

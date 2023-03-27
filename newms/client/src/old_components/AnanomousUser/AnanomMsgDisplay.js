import React from "react";
import Avatar from "../Avatar";
import { imageShow, videoShow } from "../../utils/mediaShow";

const AnanomMsgDisplay = ({ msg, theme }) => {
  return (
    <>
      <div className="chat_title">
        <Avatar
          src={
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          size="small-avatar"
        />
        <span>{"Ananom User"}</span>
      </div>
      {msg.text && (
        <div
          className="chat_text"
          style={{ filter: theme ? "invert(1)" : "invert(0)" }}
        >
          {msg.text}
        </div>
      )}

      {msg.media &&
        msg.media.map((item, index) => (
          <div key={index} style={{ maxWidth: "380px", maxHeight: "680px" }}>
            {item.url.match(/video/i)
              ? videoShow(item.url, theme)
              : imageShow(item.url, theme)}
          </div>
        ))}

      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default AnanomMsgDisplay;

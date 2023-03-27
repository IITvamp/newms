import React from "react";
import AnanomLeftSide from "../../old_components/AnanomousUser/saveAnanomMessages/LeftSide";
import AnanomUserChat from "../../old_components/AnanomousUser/saveAnanomMessages/RightSide";

const SaveConversation = () => {
  return (
    <div className="message d-flex">
      <div className="col-md-4 px-0" style={{ borderRight: "1px solid #ddd" }}>
        <AnanomLeftSide />
      </div>

      <div className="col-md-8 px-0">
        <AnanomUserChat />
      </div>
    </div>
  );
};

export default SaveConversation;

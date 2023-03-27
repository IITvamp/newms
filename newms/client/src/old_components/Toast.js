import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Toast = ({ msg, handleShow, bgColor, URL }) => {
  console.log(msg);
  const clickHandler = () => {
    if (URL) {
    } else {
      console.log("toast clicked");
    }
  };
  useEffect(() => {
    toast.clearWaitingQueue();
    if (msg.title === "Error") {
      toast.error(msg.body, {
        theme: "colored",
        autoClose: 3000,
        onClose: handleShow,
      });
    }
    if (msg.title === "Success") {
      toast.success(msg.body, {
        theme: "colored",
        autoClose: 3000,
        onClose: handleShow,
      });
    }
  }, []);
  return (
    <div onClick={clickHandler}>
      <ToastContainer></ToastContainer>
      {/* <div className={`toast-header text-light ${bgColor}`}>
          <strong className="mr-auto text-light">{msg.title}</strong>
          <button
            className="ml-auto mb-1 close text-light"
            data-dismiss="toast"
            style={{
              border: "none",
              background: "none",
              fontSize: "30px",
              right: 0,
            }}
            onClick={handleShow}
          >
            &times;
          </button>
        </div>
        <div className="toast-body">{msg.body}</div> */}
    </div>
  );
};

export default Toast;

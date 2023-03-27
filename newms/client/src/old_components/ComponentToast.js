import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const ComponentToast = ({ theme, Component }) => {
  console.log("Componenet Toast called")
  useEffect(() => {
    toast.clearWaitingQueue();
    if (theme === "Error") {
      toast.error(<Component/>, {
        theme: "colored",
        autoClose: 10000,
        // onClose: handleShow,
      });
    }
    if (theme === "Success") {
      toast.success(<Component />, {
        theme: "colored",
        autoClose: 10000,
        // onClose: handleShow,
      });
    }
  }, []);
  return (
    <div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ComponentToast;

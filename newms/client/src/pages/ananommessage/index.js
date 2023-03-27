import { Box, makeStyles, Typography, Divider } from "@material-ui/core";
// import { Stack } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
// import AnanomousChat from "./AnanomousChat";
import AnanomousUserChat from "../../old_components/AnanomousUser/AnanomUserChat";
import FindButton from "../../old_components/AnanomousUser/FindButton";
import { postDataAPI, getDataAPI } from "../../utils/fetchData";
import {
  getMessages,
  getConversations,
} from "../../redux/actions/saveConversation";

// import EndChatModel from "../../old_components/AnanomousUser/EndChatModel";

const useStyle = makeStyles((theme) => ({
  component: {
    background: "#f8f9fa",
    textAlign: "center",
  },
  container: {
    padding: "0 0",
    [theme.breakpoints.down("sm")]: {
      padding: -0,
    },
  },
  divider: {
    margin: "30px 0",
  },
}));

const Ananommessage = () => {
  // var ENDPOINT = "http://localhost:3000/ananommessage";
  // var PAGELOCATION = window.location.href;
  const dispatch = useDispatch();

  // if (process.env.NODE_ENV === "production") {
  //   ENDPOINT = "https://nameless-bayou-10689.herokuapp.com/";
  // } else {
  //   ENDPOINT = "http://localhost:3000/ananommessage";
  // }

  const [id, setId] = useState();
  const [ownId, setOwnId] = useState();

  const [googleId, setGoogleId] = useState();
  const [messages, setMessages] = useState([]);
  const [waitMessage, setWaitMessage] = useState(
    "Click on Start Button to start the anonomous conversation"
  );
  const [code, setCode] = useState(null);
  const [bcode, setBcode] = useState(null);
  const [ananomConversation, setAnanomConversation] = useState(null);
  const [runSaveConversation, setRunSaveConversation] = useState(false);

  const [end, setEnd] = useState(false);
  const [find, setFind] = useState(false);
  const [typing, setTyping] = useState(false);
  const [b, setB] = useState(false);
  // const [onEdit, setOnEdit] = useState(false);

  //   const { auth.user, socket, isAnanomUser } = useContext(auth.userContext);
  const { auth, theme, socket, ananomMessages } = useSelector((state) => state);
  const reduxData = useSelector((state) => state);
  console.log(reduxData);
  console.log();

  const classes = useStyle();

  useEffect(() => {
    // window.addEventListener("beforeunload", alertUser);
    window.addEventListener("unload", handleEndConcert);
    return () => {
      // window.removeEventListener("beforeunload", alertUser);
      window.removeEventListener("unload", handleEndConcert);
      handleEndConcert();
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  const handleEndConcert = async () => {
    socket.emit("disconn");
  };

  useEffect(() => {
    if (ananomMessages.data.length > 0) {
      setMessages(ananomMessages.data);
    }
  }, [ananomMessages.data]);

  useEffect(() => {
    const saveConveration = async () => {
      console.log(ananomMessages);
      const res = await postDataAPI(
        `create_ananomconversation`,
        { messages },
        auth.token
      );
      setRunSaveConversation(false);
      setMessages([]);
      dispatch(getMessages());
      dispatch(getConversations({ auth }));
      console.log(res);
    };

    runSaveConversation && saveConveration();
  }, [runSaveConversation]);

  useEffect(() => {
    console.log(socket);
    socket.on("conn", (data) => {
      console.log(data);
      setId(data.id);
      setOwnId(data.ownId);
      setGoogleId(data.googleId);
      setWaitMessage(data.text);
      // setMessages([]);
      setCode(data.code);
      setBcode(data.bcode);
    });
    socket.on("waiting", (text) => {
      setWaitMessage(text.text);
      setCode(text.code);
      setBcode(text.bcode);
    });
    socket.on("disconn", (data) => {
      // console.log(data.id);
      // console.log(data.text);
      setCode(data.code);
      setBcode(data.bcode);
      setWaitMessage(data.text);
      if (messages.length > 0) {
        setRunSaveConversation(true);
      }
      // console.log(code);
    });
  }, [socket, end]);

  //todo

  // useEffect(() => {
  //   if (!isAnanomUser) {
  //     setEnd(true);
  //   }
  // }, [isAnanomUser]);

  useEffect(() => {
    if (end === true) {
      socket.emit("disconn");
      setEnd(false);
    }
  }, [end, socket]);

  useEffect(() => {
    if (waitMessage === "Stranger has left the chat") {
      if (messages.length > 0) {
        setRunSaveConversation(true);
      }
    }
  }, [waitMessage]);

  useEffect(() => {
    socket.on("istyping", (isTyping) => {
      setB(isTyping);
    });
  });

  useEffect(() => {
    socket.emit("typing", typing);
  });

  useEffect(() => {
    if (find === true) {
      console.log("trying to find");
      socket.emit("new", auth.user.gender, auth.user._id);
      setFind(false);
    }
  }, [find, socket]);

  useEffect(() => {
    toast(waitMessage);
  }, [waitMessage]);

  // useEffect(() => {
  //   const ananomId = "6209378269425237042ee680";
  //   const useless = async () => {
  //     const res = await getDataAPI(`user/${ananomId}`, auth.token);
  //     console.log(res);
  //   };
  //   useless();
  // }, []);

  // useEffect(() => {
  //   // console.log(auth.user.googleId);
  //   // console.log(googleId);
  //   if (auth.user._id != null && googleId != null && ownId != null) {
  //     // console.log(ownId);
  //     setAnanomConversation({
  //       senderId: ownId,
  //       receiverId: id,
  //     });
  //   }
  // }, [auth.user._id, ownId, googleId, socket]);

  return (
    <Box className={classes.component}>
      <ToastContainer />
      {waitMessage === "You are now chatting with a Stranger!" ? (
        <AnanomousUserChat
          id={id}
          ownId={ownId}
          receiverId={id}
          receiverSocketId={id}
          receiverGoogleId={googleId}
          waitMessage={waitMessage}
          ananomConversation={ananomConversation}
          find={find}
          setFind={setFind}
          end={end}
          setEnd={setEnd}
          bcode={bcode}
          setBcode={setBcode}
        ></AnanomousUserChat>
      ) : (
        <div className="message d-flex">
          <div className="col-md-12 px-0">
            <div className="d-flex justify-content-center align-items-center flex-column h-100">
              <i className="fa fa-bolt color-c1" style={{ fontSize: "5rem" }} />
              <h4>
                <FindButton
                  find={find}
                  setFind={setFind}
                  end={end}
                  setEnd={setEnd}
                  bcode={bcode}
                  setBcode={setBcode}
                />
              </h4>
            </div>
          </div>
        </div>
      )}
      {/* {onEdit && (
        <EndChatModel setOnEdit={setOnEdit} receiver={props.receiver} />
      )} */}
      {/* <div className="message d-flex">
        <div className="col-md-12 px-0">
          <div className="d-flex justify-content-center align-items-center flex-column h-100">
            <i className="fa fa-bolt color-c1" style={{ fontSize: "5rem" }} />
            <h4>
              <FindButton
                find={find}
                setFind={setFind}
                end={end}
                setEnd={setEnd}
                bcode={bcode}
                setBcode={setBcode}
              />
            </h4>
          </div>
        </div>
      </div>
      <Box className={classes.container}>
        <Stack sx={{ width: "96%", margin: "3px auto 3px" }}>
          <Alert
            severity={bcode === 1 ? "success" : "info"}
            action={
              <FindButton
                find={find}
                setFind={setFind}
                end={end}
                setEnd={setEnd}
                bcode={bcode}
                setBcode={setBcode}
              />
            }
          >
            <Typography className={classes.title}>{waitMessage}</Typography>
          </Alert>
        </Stack>
        {waitMessage === "You are now chatting with a Stranger!" && (
          <AnanomousUserChat
            id={id}
            ownId={ownId}
            receiverId={id}
            receiverGoogleId={googleId}
            waitMessage={waitMessage}
            ananomConversation={ananomConversation}
          ></AnanomousUserChat>
        )}

        <Divider className={classes.divider} />
      </Box> */}
    </Box>
  );
};

export default Ananommessage;

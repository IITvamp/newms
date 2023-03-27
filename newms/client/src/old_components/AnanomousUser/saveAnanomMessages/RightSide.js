import React, { useEffect, useState, useRef } from "react";
// import UserCard from "../UserCard";
// import AnanomUserCard from "./AnanomUserCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import MsgDisplay from "../../message/MsgDisplay";
import AnanomMsgDisplay from "../AnanomMsgDisplay";
// import UserCard from "../../UserCard";
import AnanomMessageCard from "./UserCard";
// import Icons from "../Icons";
// import { GLOBALTYPES } from "../../redux/actions/globalTypes";
// import { imageShow, videoShow } from "../../utils/mediaShow";
// import { imageUpload } from "../../utils/imageUpload";
// import EndChatModel from "./EndChatModel";
// import {
//   addMessage,
//   getMessages,
//   MESSAGE_TYPES,
// } from "../../redux/actions/saveConversation";

// import {
//   addMessage,
//   getMessages,
//   MESSAGE_TYPES,
// } from "../../redux/actions/messageAction";
// import LoadIcon from "../../images/loading.gif";

const AnanomUserChat = (props) => {
  console.log(props);
//   const googleId = props.receiverGoogleId;
//   const ananomConversation = props.ananomConversation;
//   const receieverSocketID = props.receieverSocketID;
//   const id = props.id;
//   const ownID = props.ownId;
  const [messages, setMessages] = useState([]);
  const { auth, message, ananomMessages, theme } = useSelector((state) => state);
        const { id } = useParams();
//   const dispatch = useDispatch();
//   const [incomingMessage, setIncomingMessage] = useState(null);
//   const [text, setText] = useState("");
//   const [page, setPage] = useState(0);
//   const [onEdit, setOnEdit] = useState(false);
//   const [media, setMedia] = useState([]);
//   const [loadMedia, setLoadMedia] = useState(false);

    console.log(messages);
  useEffect(() => {
    const getMessages = async () => {
      await ananomMessages.conversation.map((user) => {
        console.log(user)
        if (user.id === id) {
          console.log(user);
          setMessages(user.messages);
        }
      });
    }
    getMessages();
// setMessages(props.messages);
  }, [id])
  
  console.log(messages)
//   const refDisplay = useRef();
//   const pageEnd = useRef();

//   useEffect(() => {
//     socket.on("getAnanomMessage", (data) => {
//       console.log(data);
//       setIncomingMessage({
//         sender: data.sender,
//         receiverId: auth.user._id,
//         text: data.text,
//         media: data.media,
//         createdAt: data.createdAt,
//       });
//     });
//   }, [socket]);

//   console.log(incomingMessage);

//   useEffect(() => {
//     const addmessage = async () => {
//       if (incomingMessage) {
//         setMessages((prev) => [...prev, incomingMessage]);
//         await dispatch(addMessage({ message: incomingMessage }));
//       }
//     };
//     addmessage();
//   }, [incomingMessage]);

//   const handleChangeMedia = (e) => {
//     const files = [...e.target.files];
//     let err = "";
//     let newMedia = [];

//     files.forEach((file) => {
//       if (!file) {
//         return (err = "File does not exist.");
//       }
//       if (file.size > 1024 * 1024 * 5) {
//         return (err = "Image size must be less than 5 mb.");
//       }
//       return newMedia.push(file);
//     });
//     if (err) {
//       dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
//     }
//     setMedia([...media, ...newMedia]);
//   };

//   const handleDeleteMedia = (index) => {
//     const newArr = [...media];
//     newArr.splice(index, 1);
//     setMedia(newArr);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim() && media.length === 0) return;
//     setText("");
//     setMedia([]);

//     setLoadMedia(true);

//     let newArr = [];
//     if (media.length > 0) newArr = await imageUpload(media);

//     let message = {
//       sender: auth.user._id,
//       receiverId: googleId,
//       text,
//       media: newArr,
//       createdAt: new Date().toISOString(),
//     };
//     console.log(ananomConversation);
//     console.log(ownID);
//     // ananomConversation?.members?.includes(ownID) &&
//     setMessages((prev) => [...prev, message]);
//     socket.emit("sendAnanomMessage", message);
//     setLoadMedia(false);
//     await dispatch(addMessage({ message }));
//     if (refDisplay.current) {
//       refDisplay.current.scrollIntoView({
//         behaviour: "smooth",
//         block: "end",
//       });
//     }
//   };

//   useEffect(() => {
//     if (refDisplay.current) {
//       refDisplay.current.scrollIntoView({
//         behaviour: "smooth",
//         block: "end",
//       });
//     }
//   }, [text]);

//   useEffect(() => {
//     if (incomingMessage) {
//       refDisplay.current.scrollIntoView({
//         behaviour: "smooth",
//         block: "end",
//       });
//     }
//   }, [incomingMessage]);

//   console.log(googleId);
  return (
    <>
      <div className="message_header">
        {/* {user.length !== 0 && ( */}
        {/* <AnanomUserCard
          find={props.find}
          setFind={props.setFind}
          end={props.end}
          setEnd={props.setEnd}
          bcode={props.bcode}
          setBcode={props.setBcode}
          receiver={googleId}
        >
          <i className="fas fa-trash text-danger" />
        </AnanomUserCard> */}
        {/* )} */}
      </div>

      <div className="chat_container" style={{ height: "calc(100% - 180px)" }}>
        {/* <div className="chat_display" ref={refDisplay}> */}
          {/* <button style={{ marginTop: "-25px", opacity: 0 }} ref={pageEnd}>
            Load..
          </button> */}

          {messages.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat_row other_message">
                  <AnanomMsgDisplay msg={msg} theme={theme} />
                </div>
              )}
              {msg.sender === auth.user._id && (
                <div className="chat_row you_message">
                  <MsgDisplay user={auth.user} msg={msg} theme={theme} />
                </div>
              )}
            </div>
          ))}
          {/* {loadMedia && (
            <div className="chat_row you_message">
              <img src={LoadIcon} alt="Loading..." />
            </div>
          )} */}
        {/* </div> */}
      </div>

      {/* <div
        className="show_media"
        style={{ display: media.length > 0 ? "" : "none" }}
      >
        {media.map((item, index) => (
          <div key={index} id="file_media">
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item), theme)
              : imageShow(URL.createObjectURL(item), theme)}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>

      <form className="chat_input" onSubmit={handleSubmit}>
        <input
          placeholder="Type a message."
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            background: theme ? "#040404" : "",
            color: theme ? "white" : "",
          }}
        />
        <Icons setContent={setText} content={text} theme={theme} />
        <div className="file_upload">
          <i className="fas fa-image color-c1" />
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*,video/*"
            onChange={handleChangeMedia}
          />
        </div>
        <button
          type="submit"
          disabled={text || media.length > 0 ? false : true}
          className="material-icons"
        >
          near_me
        </button>
      </form>

      {onEdit && (
        <EndChatModel setOnEdit={setOnEdit} receiver={props.receiver} />
      )} */}
    </>
  );
};

export default AnanomUserChat;

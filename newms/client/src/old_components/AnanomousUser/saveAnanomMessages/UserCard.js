import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../../utils/fetchData";
import {
  acceptMatchRequest,
  rejectMatchRequest,
} from "../../../redux/actions/matchRequestAction";
import { getProfileUsers } from "../../../redux/actions/profileAction";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";

const AnanomMessageCard = (props) => {
  const { ananomId, conversation } = props;
  const [request, setRequest] = useState(false);
  const [match, setMatch] = useState(false);
  // const [accept, setAccept] = useState(false);
  // const [reject, setReject] = useState(false);
  const [received, setReceived] = useState(false);
  const [sent, setSent] = useState(false);
  const { auth } = useSelector((state) => state);
  
      const dispatch = useDispatch();

  useEffect(() => {
     const isRequested = () => {
       if (conversation.matchRequest) {
         setRequest(true)
       }
     };
    const isMatch = () => {
      auth.user.matches.forEach((item) => {
        if (item === ananomId) {
          setMatch(true);
        }
      })
    }
    const isSentorReceived = () => {
      if (conversation.matchRequest) {
        if (auth.user._id === conversation.matchRequest.sender) {
          setSent(true);
        } else if (auth.user._id === conversation.matchRequest.receiver) {
          setReceived(true);
        }
      }
    }
    // const isRejected = async () => {
    //   if (conversation._id) {
    //     const res = await getDataAPI(`request/${conversation._id}`);
    //     if (res.status !== 200) {
    //       setReject(true);
    //     }
    //   }
    // };
    isRequested();
    isMatch();
    isSentorReceived();
    // isRejected();
  }, []);
  

  const AcceptHandler = () => {
    setMatch(true);
    dispatch(acceptMatchRequest({ auth, id: conversation.matchReuest._id }));
  }

  const RejectHandler = () => {
    setRequest(true);
    dispatch(rejectMatchRequest({auth, id:conversation.matchReuest._id}))
  }

  return (
    <div
      className={`d-flex justify-content-between p-2 w-100 align-items-center`}
    >
      <Link
        to={`/`}
        className="d-flex align-items-center"
        style={{ textDecoration: "none" }}
      >
        <div>
          <div className="outer-shadow big-avatar-cover ">
            <Avatar
              src={
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              }
              size="big-avatar"
            />
          </div>
          <div className="ms-2" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block color-c2">{"Ananomous User"}</span>
          </div>
          {/* {match && (
            <div className="ms-2" style={{ transform: "translateY(-2px)" }}>
              <span>Match</span>
            </div>
          )} */}
          {sent && (
            <div className="ms-2" style={{ transform: "translateY(-2px)" }}>
              <span>Pending</span>
            </div>
          )}
          {request && received && (
            <div className="ms-2" style={{ transform: "translateY(-2px)" }}>
            <button onClick={AcceptHandler}>Accept</button>
            <button onClick={RejectHandler}>Reject</button>
          </div>)}
        </div>
      </Link>
    </div>
  );
};

export default AnanomMessageCard;

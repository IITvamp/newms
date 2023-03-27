import React, { useState, useEffect } from "react";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

// import { ToastContainer, toast } from "react-toastify";

import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";

import FindButton from "./FindButton";
import CommonLikedPosts from "./CommonLikedPosts";
import UserCard from "../UserCard";
import ComponentToast from "../ComponentToast";
import {
  createRequest,
  acceptMatchRequest,
} from "../../redux/actions/matchRequestAction";

import { getProfileUsers, follow } from "../../redux/actions/profileAction";
import { getDataAPI } from "../../utils/fetchData";

const AnanomUserCard = (props) => {
  const { theme, auth, socket, profile } = useSelector((state) => state);
  const [accepted, setAccepted] = useState(false);
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [fetchProfile, setFetchProfile] = useState(false);
  const [followUser, setFollowUser] = useState(false);
  const [match, setMatch] = useState(false);
  const [received, setReceived] = useState(false);
  const [sent, setSent] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { ananomId } = props;
  console.log(ananomId);

  //sockets
  socket.on("requestmatchToClient", (data) => {
    console.log(data);
    setReceived(true);
    <ComponentToast theme="Error" Component={RequestMatchNotif} />;
  });

  socket.on("makeMatchToClient", async (data) => {
    console.log(data);
    setMatch(true);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, matches: [...auth.user.matches, ananomId] },
      },
    });
    setAccepted(true);
    setFetchProfile(true);
  });

  socket.on("rejectMatchToClient", (data) => {
    console.log(data);
    setSent(false);
  });

  // socket region end

  // Toast Container
  const RequestMatchNotif = () => (
    <div>
      {console.log("requested")}
      The user you are talking to has sent you connection request.
      <Button onClick={AcceptHandler}>Accept Request</Button>{" "}
    </div>
  );

  const AcceptMatchNotif = () => (
    <div>
      {console.log("accepted")}
      Whooray, we have a new match
      <UserCard user={user}>
        <i className="fas fa-circle" />
      </UserCard>
    </div>
  );

  // ToastContainer ended

  useEffect(() => {
    const myfunc = async () => {
      const res = await getDataAPI(`user/${ananomId}`, auth.token);
      const user = res.data.user;
      setUser(user);
    };
    myfunc();
  }, []);


  useEffect(() => {
    const isRequested = async () => {
      const res = await getDataAPI(`user/${ananomId}`, auth.token);
      const user = res.data.user;
      setUser(user);
      try {
        auth.user.matches.forEach((item) => {
          if (item === ananomId) {
            setMatch(true);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    isRequested();
  }, []);


  useEffect(() => {
    if (props.receiver === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter(
        (user) => user._id === props.receiver
      );
      setUserData(newData);
    }
  }, [props.receiver, auth, dispatch, profile.users]);

  const onMatchHandler = () => {
    dispatch(
      createRequest({
        sender: auth.user._id,
        receiver: props.receiver,
        auth,
        socket,
        user: auth.user,
      })
    );
    setSent(true);
  };

  const AcceptHandler = async () => {
    await dispatch(
      acceptMatchRequest({
        auth,
        socket,
        sender: props.receiver,
        receiver: auth.user._id,
      })
    );
    setMatch(true);
    setFetchProfile(true);
  };

  // useEffect(() => {
  //   if (fetchProfile) {
  //     dispatch(getProfileUsers({ id: props.receiver, auth }));
  //   }
  //   setFetchProfile(false);
  //   setFollowUser(true);
  // }, [fetchProfile]);

  // useEffect(() => {
  //   if (followUser) {
  //     dispatch(
  //       follow({ users: profile.users, user: userData[0], auth, socket })
  //     );
  //   }
  //   setFollowUser(false);
  // }, [followUser]);

  return (
    <div
      className={`d-flex justify-content-between p-2 w-100 align-items-center`}
    >
      <Link
        to={`/`}
        //   onClick={handleCloseAll}
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
        </div>
      </Link>
      <button
        className="btn-1 outer-shadow hover-in-shadow"
        onClick={() => setOnEdit(true)}
      >
        Common Interests
      </button>
      {match && <Button>Match already</Button>}
      {!match && received && !sent && (
        <Button onClick={AcceptHandler}>Accept Request</Button>
      )}
      {!match && !received && sent && <Button>Pending...</Button>}

      {!match && !received && !sent && (
        <Button onClick={onMatchHandler}>Match Request</Button>
      )}
      <FindButton
        find={props.find}
        setFind={props.setFind}
        end={props.end}
        setEnd={props.setEnd}
        bcode={props.bcode}
        setBcode={props.setBcode}
      />

      {/* <ToastContainer></ToastContainer> */}
      {received && (
        <ComponentToast theme="Success" Component={RequestMatchNotif} />
      )}
      {accepted && (
        <ComponentToast theme="Success" Component={AcceptMatchNotif} />
      )}
      {onEdit && (
        <CommonLikedPosts setOnEdit={setOnEdit} receiver={props.receiver} />
      )}
    </div>
  );
};

export default AnanomUserCard;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getSentMatchRequests,
  getReceivedMatchRequests,
} from "../../../redux/actions/matchRequestAction";

import AnanomUserChat from "./RightSide";
import AnanomMessageCard from "./UserCard";

const MatchRequestsLeftSide = () => {
    // const [sentMatchRequests, setSentMatchRequests] = useState([]);
    // const [receivedMatchRequests, setReceivedMatchRequests] = useState([]);
  const [active, setActive] = useState("Sent");
  

  const { auth, requests } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  // const { id } = useParams();
//   const pageEnd = useRef();
//   const [page, setPage] = useState(0);

  // const [search, setSearch] = useState("");
  // const [users, setUsers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
  };
  // if (!search) return setSearchUsers([]);

  //     try {
  //         const res = await getDataAPI(`search?username=${search}`, auth.token);
  //         console.log(res);
  //     //   setSearchUsers(res.data.users);
  //     } catch (err) {
  //       dispatch({
  //         type: GLOBALTYPES.ALERT,
  //         payload: { error: err.response.data.msg },
  //       });
  //     }
  //   };

  const handleAddUser = (user) => {
    //     setSearch("");
    //     setSearchUsers([]);
    //     dispatch(addUser({ user, message }));
    return history.push(`/matchrequests/${user.id}`);
    };
    
    useEffect(() => {
            dispatch(getSentMatchRequests({ auth }));
            dispatch(getReceivedMatchRequests({ auth }));
    }, [dispatch, auth])
//   useEffect(() => {
//     if (ananomMessages.firstLoad) return;
//     dispatch(getConversations({ auth }));
//   }, [dispatch, auth, ananomMessages.firstLoad]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setPage((p) => p + 1);
//         }
//       },
//       {
//         threshold: 0.1,
//       }
//     );
//     observer.observe(pageEnd.current);
//   }, [setPage]);

  // useEffect(() => {
  //   // if (message.resultUsers >= (page - 1) * 9 && page > 1) {
  //     dispatch(getConversations({ auth, page }));
  //   // }
  // }, [auth]);

//   useEffect(() => {
//     if (ananomMessages.resultUsers >= (page - 1) * 9 && page > 1) {
//       dispatch(getConversations({ auth, page }));
//     }
//   }, [ananomMessages.resultUsers, page, auth, dispatch]);

  return (
    <>
      <form className="message_header">
        <input
          type="text"
          //   value={search}
          //   onChange={(e) => setSearch(e.target.value)}
          placeholder="search..."
        />

        <button style={{ display: "none" }} type="submit" id="search">
          Search
        </button>
      </form>

      <div className="message_chat_list">
        {/* {searchUsers.length !== 0 ? ( */}
        <>
          {/* {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} />
              </div>
            ))} */}
        </>
        {/* ) : ( */}
        <>
          {active === "Sent" &&
            requests.sentRequests.map((user) => (
              <div
                key={user.id}
                // cclassName={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <AnanomMessageCard>
                  <i className="fas fa-circle" />
                </AnanomMessageCard>
              </div>
            ))}
          {active === "Received" &&
            requests.receivedRequests.map((user) => (
              <div
                key={user.id}
                // cclassName={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <AnanomMessageCard>
                  <i className="fas fa-circle" />
                </AnanomMessageCard>
              </div>
            ))}
        </>
      </div>
    </>
  );
};

export default MatchRequestsLeftSide;

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { getConversations } from "../../../redux/actions/saveConversation";
// import { getDataAPI } from "../../../utils/fetchData";
// import AnanomMessageCard from "./UserCard"
import AnanomUserChat from "./RightSide";
import AnanomMessageCard from "./UserCard";

const AnanomLeftSide = () => {
  const { auth, message, ananomMessages } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  // const { id } = useParams();
  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  // const [search, setSearch] = useState("");
  // const [users, setUsers] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
    }
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
    return history.push(`/savemessage/${user.id}`);
  };

//   const isActive = (user) => {
//     if (id === user._id) return "active";
//     return "";
//   };

  useEffect(() => {
    if (ananomMessages.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, ananomMessages.firstLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setPage]);

  // useEffect(() => {
  //   // if (message.resultUsers >= (page - 1) * 9 && page > 1) {
  //     dispatch(getConversations({ auth, page }));
  //   // }
  // }, [auth]);

  useEffect(() => {
    if (ananomMessages.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [ananomMessages.resultUsers, page, auth, dispatch]);

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
          {console.log(ananomMessages.conversation)}
          {ananomMessages.conversation.map((user) => (
            <div
              key={user.id}
              // cclassName={`message_user ${isActive(user)}`}
              onClick={() => handleAddUser(user)}
            >
              <AnanomMessageCard conversation={user}>
                <i className="fas fa-circle" />
              </AnanomMessageCard>
            </div>
          ))}
        </>
        {/* )} */}

        <button style={{ opacity: 0 }} ref={pageEnd}>
          Load more..
        </button>
      </div>
    </>
  );
};


export default AnanomLeftSide;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "./PostCard";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/postAction";

const EndChatModel = (props) => {
  const { auth, theme } = useSelector((state) => state);
//   const [posts, setPosts] = useState([]);
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(1);
//   const [load, setLoad] = useState(false);
    
    const saveConveration = async() => {
        const res = await postDataAPI(
            `create_ananomconversation`,
            props.conversation,
        auth.token
      );
    }

//   useEffect(() => {
//     const fetchposts = async () => {
//       const res = await getDataAPI(
//         `getCommonLikedPosts/?limit=${page * 9}&receiver=${props.receiver}`,
//         auth.token
//       );
//       console.log(res);
//       setPosts(res.data.posts);
//     };
//     fetchposts();
//   }, [page]);

//   const handleLoadMore = async () => {
//     setLoad(true);
//     setPage(page + 1);
//     // dispatch({
//     //   type: POST_TYPES.GET_POSTS,
//     //   payload: { ...res.data, page: homePosts.page + 1 },
//     // });
//     setLoad(false);
//   };
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center follow_box-heading">
          This chat has been ended
        </h5>
        <hr />
        <div className="posts">
          <button onClick={saveConveration}>save</button>
        </div>

        <div className="close" onClick={() => props.setOnEdit(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default EndChatModel;

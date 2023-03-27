import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "./PostCard";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/postAction";

const CommonLikedPosts = (props) => {
  const { homePosts, auth, theme } = useSelector((state) => state);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetchposts =async () => {
      const res = await getDataAPI(
        `getCommonLikedPosts/?limit=${page * 9}&receiver=${
          props.receiver
        }`,
        auth.token
      );
      console.log(res);
      setPosts((res.data.posts));
    }
    fetchposts();
  }, [page])

  const handleLoadMore = async () => {
    setLoad(true);
    setPage(page + 1);
    // dispatch({
    //   type: POST_TYPES.GET_POSTS,
    //   payload: { ...res.data, page: homePosts.page + 1 },
    // });
    setLoad(false);
  };
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center follow_box-heading">Common Likes</h5>
        <hr />
        <div className="posts">
          //{" "}
          {posts.map((post) => (
            <PostCard key={post._id} post={post} theme={theme} />
          ))}
          {load && (
            <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
          )}
          {/* <LoadMoreBtn
            result={homePosts.result}
            page={homePosts.page}
            load={load}
            handleLoadMore={handleLoadMore}
          /> */}
        </div>

        <div className="close" onClick={() => props.setOnEdit(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default CommonLikedPosts;

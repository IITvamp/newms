import { GLOBALTYPES } from "./globalTypes";
import {
  postDataAPI,
  getDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import { createNotify, removeNotify } from "./notifyAction";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST",
  REPORT_POST: "REPORT_POST",
  SAVE_POST: "SAVE_POST",
};

export const createPost =
  ({title, content, images,url, auth, socket }) =>
  async (dispatch) => {
    let media = [];

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      if (images.length > 0) {
        media = await imageUpload(images);
      }

      const res = await postDataAPI(
        "posts",
        { title, content, images: media, url },
        auth.token
      );

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

      // todo notification
      const msg = {
        id: res.data.newPost._id,
        text: "Added a new post.",
        recipients: res.data.newPost.user.followers,
        url: `/post/${res.data.newPost._id}`,
        content,
        image: media[0].url,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      console.log(err);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  console.log(token)
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
    const res = await getDataAPI("posts", token);
    console.log(res)
    dispatch({ type: POST_TYPES.GET_POSTS, payload: { ...res.data, page: 2 } });

    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const updatePost =
  ({ title, content, images,url, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);
    if (
      status.title === title && 
      status.content === content &&
      status.url===url&&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length
    ) {
      return;
    }
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (imgNewUrl.length > 0) {
        media = await imageUpload(imgNewUrl);
      }
      const res = await patchDataAPI(
        `post/${status._id}`,
        { title, content, images: [...imgOldUrl, ...media], url },
        auth.token
      );

      dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const likePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: [...post.likes, auth.user],
      dislikes: post.dislikes.filter(
        (dislike) => dislike._id !== auth.user._id
      ),
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    socket.emit("likePost", newPost);
    socket.emit("disLikePost", newPost);

    try {
      await patchDataAPI(`post/${post._id}/like`, null, auth.token);

      // todo notification
      const msg = {
        id: auth.user._id,
        text: "Liked your post.",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const unLikePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    socket.emit("unLikePost", newPost);

    try {
      await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);

      // todo notification
      const msg = {
        id: auth.user._id,
        text: "Liked your post.",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const disLikePost =
  ({ post, auth, socket }) =>
    async (dispatch) => {
    console.log(auth.user);
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
      dislikes: [...post.dislikes, auth.user],
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    socket.emit("disLikePost", newPost);
    socket.emit("unLikePost", newPost);

    try {
      await patchDataAPI(`post/${post._id}/dislike`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const unDisLikePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      dislikes: post.dislikes.filter(
        (dislike) => dislike._id !== auth.user._id
      ),
    };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    socket.emit("disLikePost", newPost);

    try {
      await patchDataAPI(`post/${post._id}/undislike`, null, auth.token);

      // todo notification
      // const msg = {
      //   id: auth.user._id,
      //   text: "Liked your post.",
      //   recipients: [post.user._id],
      //   url: `/post/${post._id}`,
      // };

      // dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const getPost =
  ({ detailPost, id, auth }) =>
  async (dispatch) => {
    if (detailPost.every((post) => post._id !== id)) {
      try {
        const res = await getDataAPI(`post/${id}`, auth.token);
        dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            error: err.response.data.msg,
          },
        });
      }
    }
  };

export const deletePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post });

    try {
      const res = await deleteDataAPI(`post/${post._id}`, auth.token);

      // todo notification
      const msg = {
        id: post._id,
        text: "Added a new post.",
        recipients: res.data.newPost.user.followers,
        url: `/post/${post._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const reportPost =
  ({ post, auth }) =>
  async (dispatch) => {
    const reportExist = post.reports.find((report) => report === auth.user._id);

    if (reportExist && reportExist.length > 0) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "You have already reported this post." },
      });
    }
    const newPost = { ...post };
    newPost.reports.push(auth.user._id);

    dispatch({ type: POST_TYPES.REPORT_POST, payload: newPost });

    try {
      const res = await patchDataAPI(
        `post/${post._id}/report`,
        null,
        auth.token
      );
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const savePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] };

    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`savePost/${post._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const unSavePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const newUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== post._id),
    };

    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });

    try {
      await patchDataAPI(`unSavePost/${post._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

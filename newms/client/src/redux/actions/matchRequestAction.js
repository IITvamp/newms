import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI, getDataAPI } from "../../utils/fetchData";
import { createNotify, removeNotify } from "./notifyAction";

export const REQUEST_TYPES = {
  LOADING: "LOADING_REQUESTS",
  CREATE_REQUEST: "CREATE_REQUEST",
  ACCEPT_REQUEST: "ACCEPT_REQUEST",
  REJECT_REQUEST: "REJECT_REQUEST",
  GET_SENT_REQUESTS: "GET_SENT_REQUESTS",
  GET_RECEIVED_REQUESTS: "GET_RECEIVED_REQUESTS",
  GET_MATCH_REQUEST: "GET_MATCH_REQUEST",
};

export const createRequest =
  ({ sender, receiver, user, auth, socket }) =>
  async (dispatch) => {
    if (user.matches.every((item) => item._id !== receiver)) {
      try {
          await postDataAPI("createrequest", { sender, receiver }, auth.token);
          dispatch({
            type: REQUEST_TYPES.CREATE_REQUEST,
          });
          socket.emit("requestmatch", receiver);
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const getSentMatchRequests =
  ({ auth}) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `sentrequests`,
        auth.token
      );
      let newArr = res.data.matchRequests;
      dispatch({
        type: REQUEST_TYPES.GET_SENT_REQUESTS,
        payload: { newArr, result: res.data.result },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getReceivedMatchRequests =
  ({ auth}) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `receivedrequests`,
        auth.token
      );
      let newArr = res.data.matchRequests;
      dispatch({
        type: REQUEST_TYPES.GET_RECEIVED_REQUESTS,
        payload: { newArr, result: res.data.result },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const acceptMatchRequest =
  ({ auth, socket, sender, receiver }) =>
  async (dispatch) => {
    // if (users.every((item) => item._id !== user._id)) {
    //   newUser = { ...user, matches: [...user.matches, auth.user] };
    // } else {
    //   users.forEach((item) => {
    //     if (item._id === user._id) {
    //       newUser = { ...item, matches: [...item.matches, auth.user] };
    //     }
    //   });
    // }

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, matches: [...auth.user.matches, sender] },
      },
    });

    try {
      const res = await postDataAPI(
        `/acceptrequest`,
        {sender, receiver},
        auth.token
      );
      // todo socket
      socket.emit("makematch", sender, receiver);

      // todo notification
      const msg = {
        id: auth.user._id,
        text: "is now a match with you",
        recipients: [sender],
        url: `/profile/${auth.user._id}`,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const rejectMatchRequest =
  ({ sender, receiver, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await postDataAPI(`/rejectrequest`, { sender, receiver }, auth.token);
      socket.emit("rejectmatch", sender, receiver);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
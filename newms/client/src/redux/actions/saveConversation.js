import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI, getDataAPI } from "../../utils/fetchData";

export const ANANOM_MESSAGE_TYPES = {
  ADD_ANANOM_MESSAGE: "ADD_ANANOM_MESSAGE",
  GET_ANANOM_CONVERSATIONS: "GET_ANANOM_CONVERSATIONS",
  GET_ANANOM_MESSAGES: "GET_ANANOM_MESSAGES",
};

export const addMessage =
  ({ message}) =>
  async (dispatch) => {
    dispatch({ type: ANANOM_MESSAGE_TYPES.ADD_ANANOM_MESSAGE, payload: message });
  };

export const getConversations =
  ({ auth, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `ananomconversations?limit=${page * 9}`,
        auth.token
      );
      console.log(res);
      let newArr = [];
      res.data.ananomconversations.forEach((item) => {
        // item.recipients.forEach((cv) => {
        //   if (cv._id !== auth.user._id) {
            newArr.push({text: item.text, media: item.media, messages: item.messages,id:item._id });
        //   }
        // });
      });

      dispatch({
        type: ANANOM_MESSAGE_TYPES.GET_ANANOM_CONVERSATIONS,
        payload: { newArr, result: res.data.result },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getMessages =
  () =>
  async (dispatch) => {

      dispatch({ type: ANANOM_MESSAGE_TYPES.GET_ANANOM_MESSAGES });
    // } catch (err) {
    //   dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: { error: err.response.data.msg },
    //   });
    // }
  };
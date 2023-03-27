import { REQUEST_TYPES } from "../actions/matchRequestAction";

const initialState = {
  sentRequests: [],
  receivedRequests: [],
  resultSentRequests: 0,
  resultReceivedRequests: 0,
  firstLoad: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TYPES.CREATE_REQUEST:
      return {
        ...state,
      };

    case REQUEST_TYPES.GET_SENT_REQUESTS:
      return {
        ...state,
        sentRequests: action.payload.newArr,
        resultSentRequests: action.payload.result,
      };

    case REQUEST_TYPES.GET_RECEIVED_REQUESTS:
      return {
        ...state,
        sentRequests: action.payload.newArr,
        resultReceivedRequests: action.payload.result,
      };

    case REQUEST_TYPES.GET_MESSAGES:
      return {
        ...state,
        data: action.payload.messages.reverse(),
        resultData: action.payload.result,
      };

    default:
      return state;
  }
};

export default messageReducer;

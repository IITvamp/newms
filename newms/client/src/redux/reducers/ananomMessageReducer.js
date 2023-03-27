import { ANANOM_MESSAGE_TYPES } from "../actions/saveConversation";

const initialState = {
  // message:[],
  //   users: [],
  //   resultUsers: 0,
  conversation: [],
  data: [],
  resultData: 0,
  resultUsers: 0,
  firstLoad: false,
};

const ananomMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ANANOM_MESSAGE_TYPES.ADD_ANANOM_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        // users: state.users.map((user) =>
        //   user._id === action.payload.recipient ||
        //   user._id === action.payload.sender
        //     ? {
        //         ...user,
        //         text: action.payload.text,
        //         media: action.payload.media,
        //       }
        //     : user
        // ),
      };

    case ANANOM_MESSAGE_TYPES.GET_ANANOM_CONVERSATIONS:
      return {
        ...state,
        conversation: action.payload.newArr,
        resultUsers: action.payload.result,
        firstLoad: true,
      };

    case ANANOM_MESSAGE_TYPES.GET_ANANOM_MESSAGES:
      return {
        ...state,
        data: [],
        // resultData: action.payload.result,
      };

    default:
      return state;
  }
};

export default ananomMessageReducer;

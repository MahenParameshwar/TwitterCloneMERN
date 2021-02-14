import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  UPLOAD_PROFILE_PIC_REQUEST,
  UPLOAD_PROFILE_PIC_SUCCESS,
  UPLOAD_PROFILE_PIC_FAILURE,
} from "./actionConstants";

const initState = {
  user: null,
  isLoading: false,
  error: false,
  message: "",
};

export const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    case GET_USER_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: "Colud not load Data",
      };
    case UPLOAD_PROFILE_PIC_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPLOAD_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: payload,
      };
    case UPLOAD_PROFILE_PIC_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: "Colud not Uupload pic",
      };

    default:
      return state;
  }
};

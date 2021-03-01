import {
  GET_NEWS_FAILURE,
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
} from "./actionConstants";

const initState = {
  isLoading: false,
  error: false,
  message: "",
  newsArr: null,
};

export const newsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_NEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        newsArr: payload,
      };
    case GET_NEWS_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: "Colud not load Data",
      };

    default:
      return state;
  }
};

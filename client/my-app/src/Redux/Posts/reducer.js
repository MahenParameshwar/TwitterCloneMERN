import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
} from "./actionConstants";

const initState = {
  posts: [],
  isLoading: false,
  error: false,
  message: "",
};

export const postsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [payload, ...state.posts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: "Colud not add post",
      };
    case GET_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [...payload],
      };
    case GET_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: "Colud not get post",
      };

    default:
      return state;
  }
};

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  GET_SINGLE_POST_REQUEST,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  SEARCH_POST_REQUEST,
  SEARCH_POST_SUCCESS,
  SEARCH_POST_FAILURE,
} from "./actionConstants";

const initState = {
  posts: [],
  post: null,
  isLoading: false,
  error: false,
  message: "",
  searchPostsResults: [],
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
        posts: [...payload],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
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
        error: true,
        message: "Colud not load post",
      };
    case GET_SINGLE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SINGLE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: payload,
      };
    case GET_SINGLE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: "Colud not get post",
      };
    case DELETE_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: "Colud not delete post",
      };
    case SEARCH_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        searchPostsResults: [...payload],
      };

    case SEARCH_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: "Somthing went wrong",
      };

    default:
      return state;
  }
};

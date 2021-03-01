import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UPDATE_PROFILE,
  SEARCH_PROFILES_FAILURE,
  SEARCH_PROFILES_REQUEST,
  SEARCH_PROFILES_SUCCESS,
} from "./actionConstants";

const initState = {
  isLoading: false,
  error: false,
  message: "",
  profile: null,
  posts: [],
  searchProfileResults: [],
};

export const profileReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: payload.profile,
        posts: payload.posts,
      };
    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: "User not found",
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case FOLLOW_REQUEST:
      return {};
    case FOLLOW_SUCCESS:
      return {};
    case FOLLOW_FAILURE:
      return {};
    case SEARCH_PROFILES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_PROFILES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        searchProfileResults: [...payload],
      };

    case SEARCH_PROFILES_FAILURE:
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

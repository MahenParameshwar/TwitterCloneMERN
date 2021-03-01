import axios from "axios";
import { getUserDataSuccess } from "../User/action";
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

const getProfileRequest = () => {
  return {
    type: GET_USER_PROFILE_REQUEST,
  };
};

const getProfileSuccess = (profile) => {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload: profile,
  };
};

const getProfileFailure = () => {
  return {
    type: GET_USER_PROFILE_FAILURE,
  };
};

const updateProfile = (payload) => {
  return {
    type: UPDATE_PROFILE,
    payload,
  };
};

export const makeGetUserProfileRequest = ({ username, getReply: isReply }) => (
  dispatch
) => {
  dispatch(getProfileRequest());
  console.log(isReply);
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/profile/${username}`, {
      params: {
        isReply,
      },
    })
    .then((res) => {
      dispatch(getProfileSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getProfileFailure());
    });
};

const followRequest = () => {
  return {
    type: FOLLOW_REQUEST,
  };
};

const followSuccess = (profile) => {
  return {
    type: FOLLOW_SUCCESS,
    payload: profile,
  };
};

const followFailure = () => {
  return {
    type: FOLLOW_FAILURE,
  };
};

export const makeFollowRequest = ({ profileId, token }) => (dispatch) => {
  return axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/profile/${profileId}/follow`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(updateProfile(res.data.profile));
      dispatch(getUserDataSuccess(res.data.logedUser));
    })
    .catch((err) => {});
};

export const makeFollowRequestFromFollowPage = ({ profileId, token }) => (
  dispatch
) => {
  return axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/profile/${profileId}/follow`,
      {},
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);

      dispatch(getUserDataSuccess(res.data.logedUser));
    })
    .catch((err) => {});
};

const searchProfilesRequest = () => {
  return {
    type: SEARCH_PROFILES_REQUEST,
  };
};

const searchProfilesSuccess = (payload) => {
  return {
    type: SEARCH_PROFILES_SUCCESS,
    payload: payload,
  };
};

const searchProfilesFailure = () => {
  return {
    type: SEARCH_PROFILES_FAILURE,
  };
};

export const makeSearchProfilesRequest = ({ token, searchQuery }) => (
  dispatch
) => {
  dispatch(searchProfilesRequest());
  axios(`${process.env.REACT_APP_SERVER_URL}/api/auth/search/profiles`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
    },
    params: {
      searchQuery,
    },
  })
    .then((res) => dispatch(searchProfilesSuccess(res.data.results)))
    .catch((err) => dispatch(searchProfilesFailure()));
};

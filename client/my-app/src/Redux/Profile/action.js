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
      console.log(res.data);
      dispatch(updateProfile(res.data.profile));
      dispatch(getUserDataSuccess(res.data.logedUser));
    })
    .catch((err) => {});
};

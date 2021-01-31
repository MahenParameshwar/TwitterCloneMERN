import axios from "axios";
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
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

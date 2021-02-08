import axios from "axios";
import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_SUCCESS,
} from "./actionConstants";

const getUserDataRequest = () => {
  return {
    type: GET_USER_DATA_REQUEST,
  };
};

export const getUserDataSuccess = (payload) => {
  return {
    type: GET_USER_DATA_SUCCESS,
    payload: payload,
  };
};

const getUserDataFailure = () => {
  return {
    type: GET_USER_DATA_FAILURE,
  };
};

export const makeGetUserDataRequest = (token) => (dispatch) => {
  dispatch(getUserDataRequest());
  console.log(token);
  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/auth/user`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(getUserDataSuccess(res.data));
    })
    .catch((err) => {
      if (err.response.status === 403) {
        localStorage.removeItem("token");
      }
      dispatch(getUserDataFailure());
    });
};

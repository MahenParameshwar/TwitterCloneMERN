import axios from "axios";
import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_FAILURE,
  GET_USER_DATA_SUCCESS,
  UPLOAD_PROFILE_PIC_REQUEST,
  UPLOAD_PROFILE_PIC_SUCCESS,
  UPLOAD_PROFILE_PIC_FAILURE,
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

const uploadProfilePicRequest = () => {
  return {
    type: UPLOAD_PROFILE_PIC_REQUEST,
  };
};

export const uploadProfilePicSuccess = (payload) => {
  return {
    type: UPLOAD_PROFILE_PIC_SUCCESS,
    payload: payload,
  };
};

const uploadProfilePicFailure = () => {
  return {
    type: UPLOAD_PROFILE_PIC_FAILURE,
  };
};

export const makeUploadProfilePicRequest = ({ token, profilePic }) => (
  dispatch
) => {
  dispatch(uploadProfilePicRequest());
  console.log(token);
  return axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/profile/updateProfilePic`,
      {
        profilePic,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(uploadProfilePicSuccess(res.data.user));
    })
    .catch((err) => {
      if (err.response?.status === 403) {
        localStorage.removeItem("token");
      }
      dispatch(uploadProfilePicFailure());
    });
};

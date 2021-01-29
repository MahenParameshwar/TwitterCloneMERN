import axios from "axios";
import {
  ADD_POST_REQUEST,
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from "./actionConstants";

const addPostRequest = () => {
  return {
    type: ADD_POST_REQUEST,
  };
};

const addPostSuccess = (payload) => {
  return {
    type: ADD_POST_SUCCESS,
    payload: payload,
  };
};

const addPostFailure = () => {
  return {
    type: ADD_POST_FAILURE,
  };
};

export const makeAddPostRequest = ({ token, content }) => (dispatch) => {
  dispatch(addPostRequest());

  return axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/post`,
      { content },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(addPostSuccess(res.data.newPost));
    })
    .catch((err) => {
      if (err.response.status === 403) {
        localStorage.removeItem("token");
      }
      dispatch(addPostFailure());
    });
};

const getPostsRequest = () => {
  return {
    type: GET_POSTS_REQUEST,
  };
};

export const getPostsSuccess = (posts) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: posts,
  };
};

const getPostsFailure = () => {
  return {
    type: GET_POSTS_FAILURE,
  };
};

export const makeGetPostsRequest = ({ token }) => (dispatch) => {
  dispatch(getPostsRequest());

  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/auth/post`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => dispatch(getPostsSuccess(res.data.results)))
    .catch((err) => dispatch(getPostsFailure()));
};

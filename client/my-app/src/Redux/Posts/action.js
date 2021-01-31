import axios from "axios";
import {
  ADD_POST_REQUEST,
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_SINGLE_POST_REQUEST,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
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

export const makeAddPostRequest = ({ token, content, postId }) => (
  dispatch
) => {
  dispatch(addPostRequest());

  return axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/post`,
      { content, postId },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(addPostSuccess(res.data.results));
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
    .get(`${process.env.REACT_APP_SERVER_URL}/api/posts`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((res) => dispatch(getPostsSuccess(res.data.results)))
    .catch((err) => dispatch(getPostsFailure()));
};

const getSinglePostRequest = () => {
  return {
    type: GET_SINGLE_POST_REQUEST,
  };
};

const getSinglePostSuccess = (post) => {
  return {
    type: GET_SINGLE_POST_SUCCESS,
    payload: post,
  };
};

const getSinglePostFailure = (payload) => {
  return {
    type: GET_SINGLE_POST_FAILURE,
  };
};

export const makeGetSinglePostRequest = ({ id }) => (dispatch) => {
  dispatch(getSinglePostRequest());

  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/viewpost/${id}`)
    .then((res) => dispatch(getSinglePostSuccess(res.data.result)))
    .catch((err) => dispatch(getSinglePostFailure()));
};

const deletePostRequest = () => {
  return {
    type: DELETE_POST_REQUEST,
  };
};

const deletePostSuccess = () => {
  return {
    type: DELETE_POST_SUCCESS,
  };
};

const deletePostFailure = () => {
  return {
    type: DELETE_POST_FAILURE,
  };
};

export const makeDeletePostRequest = ({ token, id }) => (dispatch) => {
  dispatch(deletePostRequest());
  return axios
    .delete(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/post/${id}/delete`,

      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(deletePostSuccess());
      dispatch(getPostsSuccess(res.data.results));
    })
    .catch((err) => {
      dispatch(deletePostFailure());
    });
};

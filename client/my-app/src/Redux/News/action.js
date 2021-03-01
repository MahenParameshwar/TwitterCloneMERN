import axios from "axios";
import {
  GET_NEWS_FAILURE,
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
} from "./actionConstants";

const getNewsRequest = () => {
  return {
    type: GET_NEWS_REQUEST,
  };
};

export const getNewsSuccess = (payload) => {
  return {
    type: GET_NEWS_SUCCESS,
    payload: payload,
  };
};

const getNewsFailure = () => {
  return {
    type: GET_NEWS_FAILURE,
  };
};

export const makeGetNewsRequest = (token) => (dispatch) => {
  dispatch(getNewsRequest());

  axios
    .get(
      "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=s7ukuiP96CJTGSxmsjRGusveK0FWGiiH"
    )
    .then((res) => dispatch(getNewsSuccess(res.data.results)))
    .catch((err) => {
      dispatch(getNewsFailure());
    });
};

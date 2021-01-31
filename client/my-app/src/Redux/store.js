import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { registerReducer } from "./Register/reducer";

import { loginReducer } from "./Login/reducer";
import { userReducer } from "./User/reducer";
import { postsReducer } from "./Posts/reducer";
import { profileReducer } from "./Profile/reducer";

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  posts: postsReducer,
  profile: profileReducer,
});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);

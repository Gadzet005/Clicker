import { createStore, combineReducers } from "redux";
import { userReducer } from "./userReducers";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = createStore(rootReducer);

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import wikis from "./wikiSlice";
import user from "./userSlice";

const reducer = combineReducers({
  user,
  wikis,
});

const store = configureStore({
  reducer,
});

export default store;

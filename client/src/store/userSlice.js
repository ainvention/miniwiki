import { createSlice } from "@reduxjs/toolkit";
import { Redirect } from "react-router-dom";

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

// Actions
const { loginSuccess, logoutSuccess } = userSlice.actions;

export const login = (user) => async (dispatch) => {
  try {
    // const res = await userApi.post("/api/auth/login/", { email });
    dispatch(loginSuccess(user));
  } catch (e) {
    return console.error(e.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    // const res = await userApi.post("/api/auth/logout/");
    <Redirect to="/login" />;

    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

export default userSlice.reducer;

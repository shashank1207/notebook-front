import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: !!JSON.parse(localStorage.getItem("userData")),
    data: { message: "" },
    userData: {
      token: !JSON.parse(localStorage.getItem("userData"))
        ? ""
        : JSON.parse(localStorage.getItem("userData")).token,
      userId: !JSON.parse(localStorage.getItem("userData"))
        ? ""
        : JSON.parse(localStorage.getItem("userData")).userId,
    },
    error: null,
    loading: false,
  },
  reducers: {
    switchLoginState(state, action) {
      state.isLoggedIn = action.payload;
    },
    setloading(state, action) {
      state.loading = action.payload;
    },
    setData(state, action) {
      state.userData.token = action.payload.token;
      state.userData.userId = action.payload.userId;
      state.data.message = action.payload.message;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: action.payload.userId,
          token: action.payload.token,
        })
      );
    },
    setErrors(state, action) {
      state.error = action.payload.err;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;

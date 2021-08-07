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
    },
    error: null,
    loading: false,
    user: {name: '', userId: '', email: ''}
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
      state.data.message = action.payload.message;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          token: action.payload.token,
          time: + new Date()
        })
      );
    },
    setErrors(state, action) {
      state.error = action.payload.err;
    },
    setUser(state, action){
      state.user = action.payload.user;
    }
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;

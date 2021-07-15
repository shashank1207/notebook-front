import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signup-slice";
import loginSlice from "./login-slices";

const store = configureStore({
  reducer: {signup: signupSlice.reducer, login: loginSlice.reducer}
});

export default store;
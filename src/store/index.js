import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signup-slice";
import loginSlice from "./login-slices";
import notesSlice from "./notes-slice";

const store = configureStore({
  reducer: {signup: signupSlice.reducer, login: loginSlice.reducer, notes: notesSlice.reducer}
});

export default store;
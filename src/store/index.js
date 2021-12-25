import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signup-slice";
import loginSlice from "./login-slices";
import notesSlice from "./notes-slice";
import errorSlice from "./error-slice";

const store = configureStore({
  reducer: {signup: signupSlice.reducer, login: loginSlice.reducer, notes: notesSlice.reducer, error: errorSlice.reducer}
});

export default store;
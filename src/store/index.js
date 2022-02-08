import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signup-slice";
import loginSlice from "./login-slices";
import notesSlice from "./notes-slice";
import errorSlice from "./error-slice";
import attachmentSlice from "./attachment-slice";

const store = configureStore({
  reducer: {
    signup: signupSlice.reducer,
    login: loginSlice.reducer,
    notes: notesSlice.reducer,
    error: errorSlice.reducer,
    attachment: attachmentSlice.reducer,
  },
});

export default store;

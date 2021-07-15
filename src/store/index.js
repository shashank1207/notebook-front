import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./user-slice";
const store = configureStore({
  reducer: {signup: signupSlice.reducer}
});

export default store;
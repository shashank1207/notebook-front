import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    message: "",
    hasError: false
  },
  reducers:{
    setError(state, action) {
      state.hasError = true;
      state.message = action.payload.message
    },
    revokeError(state){
      state.hasError = false
    }
  }
});

export const errorAction = errorSlice.actions;

export default errorSlice;
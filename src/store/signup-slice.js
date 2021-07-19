import { createSlice} from '@reduxjs/toolkit';

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    error: null,
    signedup: null,
  },
  reducers: {
    setErrors(state, action){
      state.error = action.payload.err;
    },
    changeSignedupStatus(state, action){
      state.signedup = action.payload.message;
    }
  }
});

export const signupActions = signupSlice.actions;

export default signupSlice; 
import { createSlice} from '@reduxjs/toolkit';

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    isLoggedIn: false,
    error: null,
    signedup: false
  },
  reducers: {
    changeLoginStatus(state){
      state.isLoggedIn = !state.isLoggedIn;
    },
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
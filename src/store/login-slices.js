import { createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    data: {token: '', userID: '', message: ''},
    error_login: null
  },
  reducers: {
    switchLoginState(state){
      state.isLoggedIn = !state.isLoggedIn
    },
    setData(state, action){
      state.data.token = action.payload.token;
      state.data.userID = action.payload.userID;
      state.data.message = action.payload.message;
    },
    setErrors(state, action){
      state.error_login = action.payload.err;
    },
  }
});

export const loginActions = loginSlice.actions;

export default loginSlice;
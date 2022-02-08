import { createSlice } from "@reduxjs/toolkit";

const attachmentSlice = createSlice({
  name: "attachment",
  initialState: {
    isAdding: false,
    uploading: false,
    list: [],
  },
  reducers: {
    IsAddingToTrue(state) {
      state.isAdding = true;
    },
    isAddingToFalse(state) {
      state.isAdding = false;
    },
    changeUploadingStatus(state, action) {
      state.uploading = action.payload;
    },
    addAttachment(state, action) {
      state.list = action.payload;
    },
  },
});

export const attachmentAction = attachmentSlice.actions;

export default attachmentSlice;

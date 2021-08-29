import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [
      {
        _id: "",
        note: "",
        title: "",
        createdOn: "",
      },
    ],
    allNotes: 
      {
        notes: [{
            _id: "",
            note: "",
            title: "",
            createdOn: "",
        }],
        totalNotes: 1
      },
  },
  reducers: {
    setNotes(state, action) {
      state.notes = action.payload.notes;
    },
    getNotes(state) {
      return state.notes;
    },
    addNote(state, action) {
      state.notes.push(action.payload);
    },
    setAllNotes(state, action) {
      state.allNotes = action.payload;
    },
  },
});

export const notesAction = notesSlice.actions;

export default notesSlice;

import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    allNotes: 
      {
        notes: [],
        totalNotes: 0
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
    updateNote(state, action){
      state.allNotes.notes.find((note, index) => {
        if (note._id === action.payload._id){
          state.allNotes.notes[index] = {...state.allNotes.notes[index], note: action.payload.note};
          return true;
        }
        return true;
      })
    },
    updateTitle(state, action){
      state.allNotes.notes.find((note, index) => {
        if (note._id === action.payload._id){
          state.allNotes.notes[index] = {...state.allNotes.notes[index], title: action.payload.title};
          return true;
        }
        return true;
      });
    },
    deleteNote(state, action){
      const newObj = state.allNotes.notes.filter(note => {
        return note._id !== action.payload.noteId;
      });
      console.log(newObj);
      state.allNotes.notes = newObj;
    }
  },
});

export const notesAction = notesSlice.actions;

export default notesSlice;

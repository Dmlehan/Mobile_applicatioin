import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NoteState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    addNoteState: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    updateNoteState: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((n) => n.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNoteState: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setNotes,
  addNoteState,
  updateNoteState,
  deleteNoteState,
  setLoading: setNoteLoading,
  setError: setNoteError,
} = noteSlice.actions;
export default noteSlice.reducer;

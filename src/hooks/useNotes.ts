import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setNotes,
  addNoteState,
  updateNoteState,
  deleteNoteState,
  setNoteLoading,
  setNoteError,
  Note,
} from '@/redux/slices/noteSlice';
import { noteService } from '@/services/noteService';
import { useAuth } from './useAuth';

export function useNotes() {
  const dispatch = useAppDispatch();
  const { notes, loading, error } = useAppSelector((state) => state.notes);
  const { user } = useAuth();

  const fetchNotes = async () => {
    if (!user) return;
    dispatch(setNoteLoading(true));
    dispatch(setNoteError(null));
    try {
      const notesList = await noteService.getNotes(user.uid);
      dispatch(setNotes(notesList));
    } catch (err: any) {
      dispatch(setNoteError(err.message || 'Failed to fetch notes.'));
    } finally {
      dispatch(setNoteLoading(false));
    }
  };

  const addNote = async (title: string, content: string, category: string) => {
    if (!user) return;
    dispatch(setNoteLoading(true));
    dispatch(setNoteError(null));
    try {
      const newNote = await noteService.createNote(user.uid, title, content, category);
      dispatch(addNoteState(newNote));
      return newNote;
    } catch (err: any) {
      dispatch(setNoteError(err.message || 'Failed to add note.'));
      throw err;
    } finally {
      dispatch(setNoteLoading(false));
    }
  };

  const editNote = async (noteId: string, updates: Partial<Omit<Note, 'id' | 'createdAt' | 'userId'>>) => {
    dispatch(setNoteLoading(true));
    dispatch(setNoteError(null));
    try {
      await noteService.updateNote(noteId, updates);
      const currentNote = notes.find((n) => n.id === noteId);
      if (currentNote) {
        dispatch(
          updateNoteState({
            ...currentNote,
            ...updates,
            updatedAt: new Date().toISOString(),
          })
        );
      }
    } catch (err: any) {
      dispatch(setNoteError(err.message || 'Failed to update note.'));
      throw err;
    } finally {
      dispatch(setNoteLoading(false));
    }
  };

  const removeNote = async (noteId: string) => {
    dispatch(setNoteLoading(true));
    dispatch(setNoteError(null));
    try {
      await noteService.deleteNote(noteId);
      dispatch(deleteNoteState(noteId));
    } catch (err: any) {
      dispatch(setNoteError(err.message || 'Failed to delete note.'));
      throw err;
    } finally {
      dispatch(setNoteLoading(false));
    }
  };

  return {
    notes,
    loading,
    error,
    fetchNotes,
    addNote,
    editNote,
    removeNote,
  };
}

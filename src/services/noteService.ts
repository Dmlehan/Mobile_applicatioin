import { createDocument, getDocuments, updateDocument, deleteDocument } from '@/firebase/firestore';
import { where, orderBy, QueryConstraint } from 'firebase/firestore';
import { Note } from '@/redux/slices/noteSlice';

const COLLECTION_NAME = 'notes';

export const noteService = {
  async createNote(userId: string, title: string, content: string, category: string): Promise<Note> {
    const now = new Date().toISOString();
    const noteData = {
      userId,
      title,
      content,
      category,
      favorite: false,
      createdAt: now,
      updatedAt: now,
    };
    const id = await createDocument(COLLECTION_NAME, noteData);
    return { id, ...noteData };
  },

  async getNotes(userId: string): Promise<Note[]> {
    const constraints: QueryConstraint[] = [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    ];
    return await getDocuments(COLLECTION_NAME, constraints);
  },

  async updateNote(
    noteId: string,
    updates: Partial<Omit<Note, 'id' | 'createdAt' | 'userId'>>
  ): Promise<void> {
    const now = new Date().toISOString();
    await updateDocument(COLLECTION_NAME, noteId, {
      ...updates,
      updatedAt: now,
    });
  },

  async deleteNote(noteId: string): Promise<void> {
    await deleteDocument(COLLECTION_NAME, noteId);
  },
};

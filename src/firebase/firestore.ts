import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  DocumentData,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './config';

export const createDocument = async (
  collectionName: string,
  data: DocumentData
): Promise<string> => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
};

export const getDocuments = async (
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<any[]> => {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);
  const docs: any[] = [];
  querySnapshot.forEach((docSnap) => {
    docs.push({ id: docSnap.id, ...docSnap.data() });
  });
  return docs;
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: Partial<DocumentData>
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
};

export const deleteDocument = async (
  collectionName: string,
  docId: string
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};

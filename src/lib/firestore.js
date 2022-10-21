import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  onAuthStateChanged,
} from './export.js';
import { auth, db } from './config.js';

export const current = () => auth.currentUser;

export const createPost = (postText) => addDoc(collection(db, 'post'), {
  displayName: current().displayName,
  email: current().email,
  data: new Date().toLocaleDateString('pt-BR'),
  hour: new Date().toLocaleTimeString([], { timeStyle: 'short' }),
  post: postText,
  user: current().uid,
});

export async function getAllPosts() {
  const collPost = query(
    collection(db, 'post'),
    orderBy('data', 'desc'),
    orderBy('hour', 'desc'),
  );
  const postSnapshot = await getDocs(collPost);
  const listPost = postSnapshot.docs.map((docColl) => {
    const id = docColl.id;
    const data = docColl.data();
    const post = {
      id,
      ...data,
    };
    return post;
  });
  return listPost;
}

export const logout = () => {
  const logoutUser = auth.signOut();
  return logoutUser;
};

export function stayLoggedIn(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user !== null);
  });
}

export const postDelete = async (postId) => {
  try {
    const docRef = doc(db, 'post', postId);
    await deleteDoc(docRef);
    return docRef.id;
  } catch (error) {
    return error;
  }
};

import { auth } from "@/services/firebase";
import { EmailAndPasswordSignInSchema } from "@/types/auth/schema";
import { Profile, profileCollection } from "@/types/auth/schema/model";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, getDoc, getDocs, query, where } from "firebase/firestore";

export const signInWithEmailAndPassword = ({
  email,
  password,
}: EmailAndPasswordSignInSchema) => {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
};

export const signupWithEmailAndPassword = ({
  email,
  password,
}: EmailAndPasswordSignInSchema) =>
  // signup schema is used only for client-side validation
  // signin schema is enough for actual request
  {
    return createUserWithEmailAndPassword(auth, email, password);
  };

export const signInWithGoogle = () => {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

export const signOut = () => {
  return auth.signOut();
};

export const getProfile = async (uid: string) => {
  const q = query(profileCollection, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // assuming there is only one profile per user for now
    return querySnapshot.docs[0].data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const createProfile = async (profile: Profile) => {
  const q = query(profileCollection, where("uid", "==", profile.uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error("Profile already exists for this user.");
  }

  const docRef = await addDoc(profileCollection, profile);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.data();
};

export const checkUsernameIsUnique = async (username: string) => {
  const q = query(profileCollection, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

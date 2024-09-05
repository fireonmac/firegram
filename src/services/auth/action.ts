import { auth } from "@/services/firebase";
import { EmailAndPasswordSignInSchema } from "@/types/auth/schema";
import { profileCollection } from "@/types/auth/schema/model";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";

export const signInWithEmailAndPassword = ({
  email,
  password,
}: EmailAndPasswordSignInSchema) => {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

export const signOut = () => {
  return auth.signOut();
};

export const getProfile = async (uid: string) => {
  try {
    const q = query(profileCollection, where('uid', '==', uid)); 
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // assuming there is only one profile per user for now
      return querySnapshot.docs[0].data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting profile: ", error);
    throw error;
  }
};
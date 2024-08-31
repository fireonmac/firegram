import { auth } from "@/services/firebase";
import { EmailAndPasswordSignInSchema } from "@/types/auth/schema";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const signInWithEmailAndPassword = ({
  email,
  password,
}: EmailAndPasswordSignInSchema) => {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = () => {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

const signOut = () => {
  return auth.signOut();
};

export { signInWithGoogle, signInWithEmailAndPassword, signOut };

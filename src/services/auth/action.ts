import { auth } from "@/services/firebase";
import { EmailAndPasswordSignInSchema } from "@/types/schema/auth";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const signInWithEmailAndPassword = ({
  email,
  password,
}: EmailAndPasswordSignInSchema) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = () => {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

const signOut = () => {
  return auth.signOut();
};

export { signInWithGoogle, signInWithEmailAndPassword, signOut };

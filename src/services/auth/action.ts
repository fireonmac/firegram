import { auth } from "@/services/firebase";
import { EmailAndPasswordLoginSchema } from "@/types/schema/auth";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const loginWithEmailAndPassword = ({
  email,
  password,
}: EmailAndPasswordLoginSchema) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const loginWithGoogle = () => {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

const logout = () => {
  return auth.signOut();
};

export { loginWithGoogle, loginWithEmailAndPassword, logout };

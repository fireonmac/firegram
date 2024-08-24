import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const loginWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return auth.signOut();
};

export { loginWithEmailAndPassword, logout };

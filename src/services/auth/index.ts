import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import {
  from,
  fromEventPattern,
  share,
  startWith,
  switchMap,
} from "rxjs";

const user$ = from(auth.authStateReady()).pipe(
  switchMap(() =>
    fromEventPattern<User | null>((handler) => auth.onAuthStateChanged(handler))
  ),

  startWith(undefined),

  share(),
);

const loginWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
  return auth.signOut();
}

export {
  // States,
  user$,
  // Functions
  loginWithEmailAndPassword,
  logout,
};

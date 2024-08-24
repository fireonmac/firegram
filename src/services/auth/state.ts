import { from, fromEventPattern, share, startWith, switchMap } from "rxjs";
import { auth } from "../firebase";
import { User } from "firebase/auth";

export const user$ = from(auth.authStateReady()).pipe(
  switchMap(() =>
    fromEventPattern<User | null>((handler) => auth.onAuthStateChanged(handler))
  ),
  startWith(undefined),
  share()
);

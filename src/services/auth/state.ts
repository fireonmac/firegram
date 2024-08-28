import { from, fromEventPattern, share, startWith, switchMap, tap } from "rxjs";
import { auth } from "../firebase";
import { User } from "firebase/auth";

export const user$ = from(auth.authStateReady()).pipe(
  switchMap(() =>
    fromEventPattern<User | null>((handler) => auth.onAuthStateChanged(handler))
  ),
  tap(user => console.log('user', user)),
  startWith(undefined),
  share(),
);
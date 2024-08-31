import { from, fromEventPattern, share, startWith, switchMap } from "rxjs";
import { User } from "firebase/auth";

import { auth } from "../firebase";

export const user$ = from(auth.authStateReady()).pipe(
  switchMap(() =>
    fromEventPattern<User | null>((handler) => auth.onAuthStateChanged(handler))
  ),
  startWith(undefined),
  share()
);

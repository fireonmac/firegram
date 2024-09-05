import { from, fromEventPattern, shareReplay, startWith, switchMap } from "rxjs";
import { User } from "firebase/auth";

import { auth } from "../firebase";

export const user$ = from(auth.authStateReady()).pipe(
  switchMap(() =>
    fromEventPattern<User | null>((handler) => auth.onAuthStateChanged(handler))
  ),
  startWith(undefined),
  shareReplay(1)
);

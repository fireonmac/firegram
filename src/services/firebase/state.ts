import { from, fromEventPattern, shareReplay, startWith, switchMap, tap } from "rxjs";
import { User } from "firebase/auth";

import { auth } from "../firebase";

export const user$ = from(auth.authStateReady()).pipe(
  switchMap(() =>
    fromEventPattern<User | null>((handler) => auth.onAuthStateChanged(handler))
  ),
  tap((v) => {
    console.log('auth state changed', v);
  }),
  startWith(undefined),
  shareReplay(1)
);

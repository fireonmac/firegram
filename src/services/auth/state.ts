import { user$ as firebaseUser$ } from "@/services/firebase/state";
import { catchError, from, map, of, shareReplay, switchMap } from "rxjs";
import { getProfile } from "./action";

/**
 * uid if user is authenticated, null if not, undefined if still loading
 */
export const uid$ = firebaseUser$.pipe(map((user) => (user ? user.uid : user)));

/**
 * when user is authenticated, get their profile
 */
export const profile$ = firebaseUser$.pipe(
  switchMap((user) => {
    // If user is not authenticated, return null
    if (!user) {
      return of(null);
    }

    // If user is authenticated, return their profile or null if they don't have one
    return from(getProfile(user.uid)).pipe(
      catchError((err) => {
        console.error(err);
        return of(null);
      })
    );
  }),
  shareReplay(1)
);
import { user$ as firebaseUser$ } from "@/services/firebase/state";
import { map } from "rxjs";

export const user$ = firebaseUser$.pipe(
  map((user) => {
    return user?.uid;
  })
);

/**
 * auth status which returns true if user is authenticated, null if not, undefined if still loading
 */
export const auth$ = firebaseUser$.pipe(map((user) => (user ? true : user)));

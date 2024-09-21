import {
  filter,
  from,
  fromEventPattern,
  map,
  merge,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from "rxjs";
import { getProfile } from "./action";
import { Profile } from "@/types/auth/schema";
import { User } from "firebase/auth";
import { auth } from "../firebase";


export const user$ = from(auth.authStateReady()).pipe(
  switchMap(() =>
    fromEventPattern<User | null>((handler) => auth.onAuthStateChanged(handler))
  ),
  startWith(undefined),
  shareReplay(1)
);

/**
 * uid if user is authenticated, null if not, undefined if still loading
 */
export const uid$ = user$.pipe(map((user) => (user ? user.uid : user)));

export const profileUpdate$$ = new Subject<Profile>();

/**
 * when user is authenticated, get their profile
 */
export const profile$ = uid$.pipe(
  filter(Boolean),
  switchMap((uid) => {
    /**
     * If user is authenticated, return their profile or null if they don't have one
     * also, listen to profileUpdate$$ when user create new profile or update existing one
     */
    return merge(from(getProfile(uid)), profileUpdate$$);
  }),
  startWith(undefined),
  shareReplay(1)
);

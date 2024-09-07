import { db } from "@/services/firebase";
import { createFirestoreDataConverter } from "@/services/firebase/util";
import { collection } from "firebase/firestore";
import { z } from "zod";

export const profileSchema = z.object({
  uid: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional(),
  photoUrl: z.string().optional(),
  gender: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().optional(),
});

const profileConverter = createFirestoreDataConverter(profileSchema);

export const profileCollection = collection(db, "profiles").withConverter(profileConverter);

export type Profile = z.infer<typeof profileSchema>;
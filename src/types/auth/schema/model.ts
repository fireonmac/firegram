import { z } from "zod";

export const profileSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  photoUrl: z.string(),
  gender: z.string(),
  bio: z.string(),
  website: z.string(),
});

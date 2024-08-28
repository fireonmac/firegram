import { z } from "zod";

export const emailAndPasswordLoginSchema = z.object({
  email: z.string().email("Enter valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(18, "Password must be at most 18 characters."),
});

export type EmailAndPasswordLoginSchema = z.infer<
  typeof emailAndPasswordLoginSchema
>;

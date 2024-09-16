import { z, ZodObject, ZodRawShape } from "zod";
import { profileSchema } from "./model";
import { configs } from "./config";

/**
 * Units
 */
const passwordSchema = z.object({
  password: z
    .string()
    .min(
      configs.password.min,
      `Password must be at least ${configs.password.min} characters.`
    )
    .max(
      configs.password.max,
      `Password must be at most ${configs.password.max} characters.`
    ),
});

const emailSchema = z.object({
  email: z.string().email("Enter valid email address."),
});

const passwordMatchSchema = passwordSchema.extend({
  confirmPassword: z.string(),
});

/**
 * Refiners
 */
const refinePasswordMatchSchema = <T extends ZodRawShape>(
  schema: ZodObject<T>
) =>
  passwordMatchSchema
    .merge(schema)
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });

/**
 * Exported schemas
 */
export const emailAndPasswordSignInSchema = passwordSchema.extend({
  email: z.string().email("Enter valid email address."),
});

export const emailAndPasswordSignUpSchema =
  refinePasswordMatchSchema(emailSchema);

export const profileCreateSchema = profileSchema
  .extend({
    username: z
      .string()
      .min(
        configs.username.min,
        `Username must be at least ${configs.username.min} characters.`
      )
      .max(
        configs.username.max,
        `Username must be at most ${configs.username.max} characters.`
      ),
    photoUpload: z
      .instanceof(File, {
        message: "Photo must be a file.",
      })
      .optional(),
  })
  .omit({ photoUrl: true });

export const profileUpdateSchema = profileCreateSchema.extend({
  currentUsername: z.string(),
  currentEmail: z.string().optional(),
});

/**
 * Exported schema types
 */
export type EmailAndPasswordSignInSchema = z.infer<
  typeof emailAndPasswordSignInSchema
>;

export type EmailAndPasswordSignUpSchema = z.infer<
  typeof emailAndPasswordSignUpSchema
>;

export type ProfileCreateSchema = z.infer<typeof profileCreateSchema>;

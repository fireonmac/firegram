import { z, ZodObject, ZodRawShape } from "zod";

const CONFIGS = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 18,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 10,
};

/**
 * Units
 */
const passwordSchema = z.object({
  password: z
    .string()
    .min(
      CONFIGS.PASSWORD_MIN_LENGTH,
      `Password must be at least ${CONFIGS.PASSWORD_MIN_LENGTH} characters.`
    )
    .max(
      CONFIGS.PASSWORD_MAX_LENGTH,
      `Password must be at most ${CONFIGS.PASSWORD_MAX_LENGTH} characters.`
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
    });

/**
 * Exported schemas
 */
export const emailAndPasswordSignInSchema = passwordSchema.extend({
  email: z.string().email("Enter valid email address."),
});

export const emailAndPasswordSignUpSchema =
  refinePasswordMatchSchema(emailSchema);

export const profileUpdateSchema = z.object({
  username: z
    .string()
    .min(
      CONFIGS.USERNAME_MIN_LENGTH,
      `Username must be at least ${CONFIGS.USERNAME_MIN_LENGTH} characters.`
    )
    .max(
      CONFIGS.USERNAME_MAX_LENGTH,
      `Username must be at most ${CONFIGS.USERNAME_MAX_LENGTH} characters.`
    ),
  firstName: z.string(),
  photoUrl: z.string().url("Enter valid URL."),
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

export type ProfileUpdateSchema = z.infer<typeof profileUpdateSchema>;

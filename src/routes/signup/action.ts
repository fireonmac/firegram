import { signupWithEmailAndPassword } from "@/services/auth";
import { emailAndPasswordSignUpSchema } from "@/types/auth/schema";
import { z } from "zod";
import { ActionFunction, redirect } from "react-router-typesafe";

export const action = (async ({ request }) => {
  const form = await request.formData();
  const payload = Object.fromEntries(form);

  try {
    const validatedPayload = emailAndPasswordSignUpSchema.parse(payload);
    await signupWithEmailAndPassword(validatedPayload);
    return redirect("/accounts/create");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        errors: err.flatten().fieldErrors as z.inferFlattenedErrors<
          typeof emailAndPasswordSignUpSchema
        >["fieldErrors"],
      };
    }

    console.error(err);
    throw err;
  }
}) satisfies ActionFunction;

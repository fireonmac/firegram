import { signInWithEmailAndPassword } from "@/services/auth";
import { signInWithGoogle } from "@/services/auth";
import {
  EmailAndPasswordSignInSchema,
  emailAndPasswordSignInSchema,
} from "@/types/auth/schema";
import { redirect } from "react-router-dom";
import { ActionFunction } from "react-router-typesafe";

import z from "zod";

export enum Intent {
  EmailAndPasswordSignIn = "EmailAndPasswordSignIn",
  GoogleSignIn = "GoogleSignIn",
}

export const action = (async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent") as Intent;
  const payload = Object.fromEntries(formData);

  switch (intent) {
    case Intent.EmailAndPasswordSignIn: {
      try {
        const validatedPayload = emailAndPasswordSignInSchema.parse(payload);
        await signInWithEmailAndPassword(validatedPayload);
        return redirect("/");
      } catch (err) {
        // only catch form validation error here,
        // other authenticaiton errors (especially from Firebase..) will be handled by error boundary
        if (err instanceof z.ZodError) {
          return {
            errors: err.flatten().fieldErrors as z.inferFlattenedErrors<
              typeof emailAndPasswordSignInSchema
            >["fieldErrors"],
          };
        }

        console.error(err);
        throw err;
      }
    }
    case Intent.GoogleSignIn: {
      await signInWithGoogle();
      return redirect("/");
    }
  }
}) satisfies ActionFunction;

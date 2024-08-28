import { loginWithEmailAndPassword } from "@/services/auth";
import { loginWithGoogle } from "@/services/auth";
import { emailAndPasswordLoginSchema } from "@/types/schema/auth";
import { redirect } from "react-router-dom";
import { ActionFunction } from 'react-router-typesafe'

import z from "zod";

export enum Intent {
  EmailAndPasswordLogin = "EmailAndPasswordLogin",
  GoogleLogin = "GoogleLogin",
}

export const action = (async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent") as Intent;
  const payload = Object.fromEntries(formData);

  switch (intent) {
    case Intent.EmailAndPasswordLogin: {
      try {
        const validatedPayload = emailAndPasswordLoginSchema.parse(payload);
        await loginWithEmailAndPassword(validatedPayload);
        return redirect("/");
      } catch (err) {
        // only catch form validation error here,
        // other authenticaiton errors (especially from Firebase..) will be handled by error boundary
        if (err instanceof z.ZodError) {
          return {
            errors: err.flatten().fieldErrors,
          };
        }

        console.error(err);
        throw err;
      }
    }
    case Intent.GoogleLogin: {
      await loginWithGoogle();
      return redirect("/");
    }
  }
}) satisfies ActionFunction;

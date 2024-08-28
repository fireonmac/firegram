import { ZodFlattenErrors } from "@/types/util";
import { loginWithEmailAndPassword } from "@/services/auth";
import { loginWithGoogle } from "@/services/auth";
import { emailAndPasswordLoginSchema } from "@/types/schema/auth";
import { ActionFunctionArgs, redirect } from "react-router-dom";

import z from "zod";

export enum Intent {
  EmailAndPasswordLogin = "EmailAndPasswordLogin",
  GoogleLogin = "GoogleLogin",
}

// I want this type to be inferred automatically from action function like Remix.. It's so shame.
export type ActionData = {
  errors?: ZodFlattenErrors;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent") as Intent;
  const payload = Object.fromEntries(formData);

  switch (intent) {
    case Intent.EmailAndPasswordLogin: {
      try {
        console.log(payload);
        const validatedPayload = emailAndPasswordLoginSchema.parse(payload);
        await loginWithEmailAndPassword(validatedPayload);
        return redirect("/");
      } catch (err) {
        if (err instanceof z.ZodError) {
          return {
            errors: err.flatten().fieldErrors,
          };
        }

        console.error(err);
        // Other Authenticaiton error (from Firebase..) except form validation will be handled by error boundary automatically
      }
      break;
    }
    case Intent.GoogleLogin: {
      await loginWithGoogle();
      return redirect("/");
    }
  }
};

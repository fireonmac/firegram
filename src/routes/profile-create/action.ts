import {
  checkEmailIsUnique,
  checkUsernameIsUnique,
  createProfile,
  profileUpdate$$,
} from "@/services/auth";
import { uploadFileToStorage } from "@/services/storage";
import { profileSchema, profileCreateSchema } from "@/types/auth/schema";
import { ActionFunction, redirect } from "react-router-typesafe";

import { z } from "zod";

export const action = (async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  try {
    const validatedPayload = profileCreateSchema.parse(payload);

    // check whether username is unique
    if (!(await checkUsernameIsUnique(validatedPayload.username))) {
      return {
        errors: {
          username: ["Username is already taken."],
        },
      };
    }

    if (
      validatedPayload.email &&
      !(await checkEmailIsUnique(validatedPayload.email))
    ) {
      return {
        errors: {
          email: ["Email is already taken."],
        },
      };
    }

    // upload profile image and get download URL
    let photoUrl: string | undefined;
    if (validatedPayload.photoUpload?.name) {
      photoUrl = await uploadFileToStorage({
        file: validatedPayload.photoUpload,
        path: `users/${validatedPayload.uid}`,
      });
    }

    // update profile document
    const profileData = profileSchema.parse({
      ...validatedPayload,
      ...(photoUrl ? { photoUrl } : {}),
    });

    const profile = await createProfile(profileData);

    if (!profile) {
      throw new Error("Could not read newly created profile.");
    }

    // update profile$ state
    profileUpdate$$.next(profile);
    return redirect("/");
  } catch (err) {
    console.error(err);
    if (err instanceof z.ZodError) {
      return {
        errors: err.flatten().fieldErrors as z.inferFlattenedErrors<
          typeof profileCreateSchema
        >["fieldErrors"],
      };
    }
    throw err;
  }
}) satisfies ActionFunction;

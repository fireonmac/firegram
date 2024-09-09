import {
  checkUsernameIsUnique,
  createProfile,
  profileUpdate$$,
} from "@/services/auth";
import { uploadFileToStorage } from "@/services/storage";
import { profileSchema, profileUpdateSchema } from "@/types/auth/schema";
import { ActionFunction, redirect } from "react-router-typesafe";

import { z } from "zod";

export const action = (async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  try {
    const validatedPayload = profileUpdateSchema.parse(payload);

    // check whether username is unique
    if (!checkUsernameIsUnique(validatedPayload.username)) {
      return {
        errors: {
          username: "Username is already taken.",
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
      throw new Error("Could not read profile.");
    }

    profileUpdate$$.next(profile);
    return redirect("/");
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log("z.err", err);

      return {
        errors: err.flatten().fieldErrors as z.inferFlattenedErrors<
          typeof profileUpdateSchema
        >["fieldErrors"],
      };
    }

    console.error(err);
    throw err;
  }
}) satisfies ActionFunction;

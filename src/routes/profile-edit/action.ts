import {
  checkEmailIsUnique,
  checkUsernameIsUnique,
  profileUpdate$$,
  updateProfile,
} from "@/services/auth";
import { uploadFileToStorage } from "@/services/storage";
import { profileSchema, profileUpdateSchema } from "@/types/auth/schema";
import { ActionFunction } from "react-router-typesafe";
import { z } from "zod";

export const action = (async ({ request }) => {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  try {
    const validatedPayload = profileUpdateSchema.parse(payload);

    if (
      validatedPayload.currentUsername !== validatedPayload.username && // check whether username has changed
      !(await checkUsernameIsUnique(validatedPayload.username)) // check whether username is unique
    ) {
      return {
        errors: {
          username: ["Username is already taken."],
        },
      };
    }

    if (
      validatedPayload.currentEmail &&
      validatedPayload.currentEmail !== validatedPayload.email &&
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

    const profile = await updateProfile(profileData);

    if (!profile) {
      throw new Error("Could not read newly updated profile.");
    }

    // update profile$ state
    profileUpdate$$.next(profile);

    return {
      profile,
      message: "Profile updated successfully.",
    };
  } catch (err) {
    console.error(err);
    if (err instanceof z.ZodError) {
      return {
        errors: err.flatten().fieldErrors as z.inferFlattenedErrors<
          typeof profileUpdateSchema
        >["fieldErrors"],
      };
    }
    throw err;
  }
}) satisfies ActionFunction;

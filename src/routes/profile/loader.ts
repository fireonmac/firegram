import { LoaderFunction } from "react-router-typesafe";
import { getProfileByUsername } from "@/services/auth";

export const loader = (async ({ params }) => {
  const username = params.username;

  if (!username) {
    throw new Error('Invalid page access');
  }
  
  const profile = await getProfileByUsername(username);

  if (!profile) {
    throw new Error("Profile not found");
  }

  return { profile };
}) satisfies LoaderFunction;

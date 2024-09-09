import { Profile } from "@/types/auth/schema/model";

export const fullNamePipe = (profile: Profile) => {
  let fullName = '';
  
  if (profile.firstName) {
    fullName += profile.firstName;
  }

  if (fullName && profile.lastName) {
    fullName += ` ${profile.lastName}`;
  }

  return fullName || profile.username;
}

export const displayNamePipe = (profile: Profile) => {
  const firstLetter = profile.firstName?.charAt(0).toUpperCase();
  const secondLetter = profile.lastName?.charAt(0).toUpperCase();
  const displayName = [firstLetter, secondLetter].filter(Boolean).join("");
  return displayName || "NN";
};

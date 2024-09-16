import { Form, useNavigation } from "react-router-dom";
import { useActionData } from "react-router-typesafe";
import { action as profileEditAction } from "./action";
import { useEffect, useState } from "react";
import { useObservableEagerState } from "observable-hooks";
import { profile$, uid$ } from "@/services/auth/state";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserCircleIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const action = profileEditAction;

const ProfileEdit = () => {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const uid = useObservableEagerState(uid$);
  const profile = useObservableEagerState(profile$);
  if (!uid || !profile) {
    throw new Error("User must be authenticated to edit profile");
  }

  const [photo, setPhoto] = useState<string | null>(profile.photoUrl ?? null);
  const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const { toast } = useToast();
  useEffect(() => {
    if (actionData?.message) {
      toast({
        description: actionData?.message,
      });
    }
  }, [actionData]);

  return (
    <>
      <div className="max-w-2xl mx-auto lg:mx-0">
        <h2 className="mb-12 text-2xl font-bold leading-9 tracking-tight text-gray-900 flex items-center gap-x-4">
          Edit your profile
        </h2>

        <Form method="post" encType="multipart/form-data">
          <input name="uid" value={uid} className="sr-only" />
          <input
            name="currentUsername"
            value={profile.username}
            className="sr-only"
          />
          <input
            name="currentEmail"
            value={profile.email}
            className="sr-only"
          />

          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        firegram.com/
                      </span>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="janesmith"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        defaultValue={profile.username}
                      />
                    </div>
                    <p className="text-sm text-destructive">
                      {actionData?.errors?.username?.[0]}
                    </p>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {photo ? (
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={photo} />
                      </Avatar>
                    ) : (
                      <UserCircleIcon
                        aria-hidden="true"
                        className="h-12 w-12 text-gray-300"
                      />
                    )}

                    <label htmlFor="photoUpload">
                      {/* When a label element is clicked, it automatically focuses the element referenced by its htmlFor attribute.
However, when a button element is clicked within the label, the button's click event takes precedence. This is because the button is a more specific element and its event handling overrides the label's default behavior. */}
                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() =>
                          document.getElementById("photoUpload")?.click()
                        }
                      >
                        Change
                      </button>
                    </label>

                    <input
                      id="photoUpload"
                      name="photoUpload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={onPhotoChange}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Bio
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={profile.bio}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={profile.firstName}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={profile.lastName}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={profile.email}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="submit"
              className="w-full"
              submitting={!!navigation.location}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ProfileEdit;

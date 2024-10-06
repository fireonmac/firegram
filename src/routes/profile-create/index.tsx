import { uid$, user$ } from "@/services/auth";
import { useObservableEagerState } from "observable-hooks";
import { Form, Navigate, useNavigation } from "react-router-dom";

import { UserCircleIcon } from "@heroicons/react/24/solid";

import { action as proifleCreateAction } from "./action";
import { useActionData } from "react-router-typesafe";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const action = proifleCreateAction;

const ProfileCreate = () => {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();

  const uid = useObservableEagerState(uid$);
  const user = useObservableEagerState(user$);

  if (!uid || !user) {
    return <Navigate to="/accounts/signIn" replace />;
  }

  const [photo, setPhoto] = useState<string | null>(null);
  const onPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <h2 className="mb-12 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Complete your profile
        </h2>

        <Form method="post" encType="multipart/form-data">
          <input name="uid" defaultValue={uid} className="sr-only" />
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
                      readOnly={!!user.email}
                      defaultValue={user.email || undefined}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

export default ProfileCreate;

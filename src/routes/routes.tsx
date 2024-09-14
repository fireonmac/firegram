import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import RootError from "./root-error";
import SignIn, { action as signInAction } from "./signin";
import { loader as signOutLoader } from "./signout";
import Home from "./home";
import Explore from "./explore";
import Reels from "./reels";
import Profile from "./profile";
import SignUp, { action as signUpAction } from "./signup";
import ProfileEdit from "./profile-edit";
import ProfileCreate, { action as profileCreateAction } from "./profile-create";

const publicRoutes = [
  {
    path: "accounts/signIn",
    element: <SignIn />,
    action: signInAction,
  },
  {
    path: "accounts/signOut",
    loader: signOutLoader,
  },
  {
    path: "accounts/emailsignup",
    element: <SignUp />,
    action: signUpAction,
  },
];

const privateRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "explore",
    element: <Explore />,
  },
  {
    path: "reels",
    element: <Reels />,
  },
  {
    path: ":username",
    element: <Profile />,
  },
  {
    path: "accounts/edit",
    element: <ProfileEdit />,
  },
];

const router = createBrowserRouter([
  {
    errorElement: <RootError />,
    children: [
      {
        children: publicRoutes,
      },
      {
        /**
         * exception: authenticated, but profile is not created yet
         */
        path: "accounts/create",
        element: <ProfileCreate />,
        action: profileCreateAction,
      },
      {
        element: <Root />,
        children: privateRoutes,
      },
    ],
  },
]);

export default router;

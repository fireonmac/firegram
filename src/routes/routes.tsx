import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import RootError from "./root-error";
import SignIn, { action as signInAction } from "./signin";
import { loader as signOutLoader } from "./signout";
import Home from "./home";
import Explore from "./explore";
import Reels from "./reels";
import Profile from "./proifle";
import SignUp, { action as signUpAction } from "./signup";
import ProfileEdit from "./profile-edit";

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
    action: signUpAction
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
        path: "",
        element: <Root />,
        children: privateRoutes,
      },
      {
        children: publicRoutes,
      },
    ],
  },
]);

export default router;

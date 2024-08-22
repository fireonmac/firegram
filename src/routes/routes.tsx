import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import RootError from "./error/root";
import Login from "./auth/login";
import Home from "./home";
import Explore from "./explore";
import Reels from "./reels";
import Profile from "./proifle";
import Signup from "./auth/signup";

const publicRoutes = [
  {
    path: "accounts/login",
    element: <Login />,
  },
  {
    path: "accounts/emailsignup",
    element: <Signup />,
  },
];

const privateRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: 'explore',
    element: <Explore />,
  },
  {
    path: 'reels',
    element: <Reels />,
  },
  {
    path: ':username',
    element: <Profile />
  }
];

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <RootError />,
    children: privateRoutes,
  },
  ...publicRoutes,
]);

export default router;

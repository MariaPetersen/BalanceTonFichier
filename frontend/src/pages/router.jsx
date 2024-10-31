import { createBrowserRouter, Navigate } from "react-router-dom";

import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Home from "./Home/Home";
import Recap from "./Recap/Recap";
import Download from "./Download/Download";
import Error from "./Error/Error";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signIn" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute element={<Home />} />,
    errorElement: <Error />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
    errorElement: <Error />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: "/recap",
    element: <PrivateRoute element={<Recap />} />,
    errorElement: <Error />,
  },
  {
    path: "/download",
    element: <PrivateRoute element={<Download />} />,
    errorElement: <Error />,
  },
]);

export default router;

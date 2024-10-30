import { createBrowserRouter } from "react-router-dom";

import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Home from "./Home/Home";
import Recap from "./Recap/Recap";
import Download from "./Download/Download";
import Error from "./Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    element: <Recap />,
    errorElement: <Error />,
  },
  {
    path: "/download",
    element: <Download />,
    errorElement: <Error />,
  },
]);

export default router;

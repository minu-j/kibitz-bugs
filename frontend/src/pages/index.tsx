import { createBrowserRouter } from "react-router-dom";

import Auth from "./auth";
import Gomoku from "./gomoku";
import Main from "./main";
import Setting from "./setting";
import NotFound from "./not-found";
import Login from "./login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/gomoku",
    element: <Gomoku />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;

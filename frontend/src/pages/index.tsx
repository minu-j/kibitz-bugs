import { createBrowserRouter } from "react-router-dom";

import Auth from "./auth/Auth";
import Gomoku from "./gomoku/Gomoku";
import Login from "./login/Login";
import Setting from "./setting/Setting";
import NotFound from "./404/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
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

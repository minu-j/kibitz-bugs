import { createBrowserRouter } from "react-router-dom";

import Auth from "./auth/Auth";
import Gomoku from "./gomoku/Gomoku";
import Main from "./main/Main";
import Setting from "./setting/Setting";
import NotFound from "./404/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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

import { createBrowserRouter } from "react-router-dom";

import Auth from "./auth/twitch";
import Gomoku from "./gomoku";
import Main from "./main";
import Setting from "./setting";
import NotFound from "./not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/auth/:provider",
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

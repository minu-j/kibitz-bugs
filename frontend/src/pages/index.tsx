import { createBrowserRouter } from "react-router-dom";

import Gomoku from "./gomoku";
import Main from "./main";
import Setting from "./setting";
import NotFound from "./not-found";
import AuthProvider from "./auth/[provider]";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/auth/:provider?",
    element: <AuthProvider />,
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

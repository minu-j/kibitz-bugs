import { Auth, Gomoku, Login, Setting } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const browserRouter = createBrowserRouter([
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
    element: <Auth />,
  },
]);

export default browserRouter;

import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages";
import Setting from "../pages/Setting/Setting";
import Gomoku from "../pages/Gomoku/Gomoku";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/gomoku",
    element: <Gomoku />,
  },
]);

export default browserRouter;

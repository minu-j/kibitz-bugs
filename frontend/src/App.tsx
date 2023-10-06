import { RouterProvider } from "react-router-dom";
import browserRouter from "./router/browserRouter";
import { useEffect } from "react";
import {
  FontStyles,
  GlobalAnimations,
  GlobalStyles,
  ResetStyles,
} from "./styles";
import "@locales/i18n";
import ReactGA from "react-ga4";

function App() {
  useEffect(() => {
    const GAID = import.meta.env.VITE_GA_TRACKING_ID;
    ReactGA.initialize(GAID);
  }, []);

  return (
    <>
      <FontStyles />
      <GlobalStyles />
      <ResetStyles />
      <GlobalAnimations />
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;

import { RouterProvider } from "react-router-dom";

import { useEffect } from "react";
import {
  FontStyles,
  GlobalAnimations,
  GlobalStyles,
  ResetStyles,
} from "./styles";
import "@/shared/i18n";
import ReactGA from "react-ga4";
import router from "../pages";
import { useChatVote } from "@/features/chat/lib";

function App() {
  useEffect(() => {
    const GAID = import.meta.env.VITE_GA_TRACKING_ID;
    ReactGA.initialize(GAID);
  }, []);

  useChatVote();

  return (
    <>
      <FontStyles />
      <GlobalStyles />
      <ResetStyles />
      <GlobalAnimations />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import { useEffect, useState } from "react";

export default function () {
  const listenFullscreen = () => {
    setIsFullscreen(document.fullscreenElement ? true : false);
  };
  const [isFullscreen, setIsFullscreen] = useState(
    document.fullscreenElement ? true : false,
  );
  useEffect(() => {
    document.addEventListener("fullscreenchange", listenFullscreen);
    return () => {
      document.removeEventListener("fullscreenchange", listenFullscreen);
    };
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return { isFullscreen, toggleFullscreen };
}

function useFullscreen() {
  const isFullscreen = () => document.fullscreenElement;
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen)
        return document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) return document.exitFullscreen();
    }
  };
  return [isFullscreen, toggleFullscreen];
}

export default useFullscreen;

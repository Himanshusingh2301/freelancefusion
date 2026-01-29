import LoadingBar from "react-top-loading-bar";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteLoader = () => {
  const loadingBarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    loadingBarRef.current?.staticStart(80);

    // Simulate completion when route finishes
    const timer = setTimeout(() => {
      loadingBarRef.current?.complete();
    }, 100); // adjust speed here

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <LoadingBar
      color="#a855f7"
      height={3}
      ref={loadingBarRef}
      shadow={true}
    />
  );
};

export default RouteLoader;

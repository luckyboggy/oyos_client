import  { useState, useEffect } from "react";

const getWindowSizes = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const IsMobil = () => {
  const [width, setWidth] = useState(getWindowSizes().width);
  useEffect(() => {
    const handleResize = () => {
      setWidth(getWindowSizes().width);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width <= 667;
};

export { IsMobil };

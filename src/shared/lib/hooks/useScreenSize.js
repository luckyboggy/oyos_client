import { useState, useEffect } from "react";
import { SCREEN } from "app/utils/consts";

const getWindowSizes = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
};

export const useScreenSize = () => {
    const [width, setWidth] = useState(getWindowSizes().width);
    useEffect(() => {
        const handleResize = () => {
            setWidth(getWindowSizes().width);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        width,
        isSm: width >= SCREEN.SM,
        isMd: width >= SCREEN.MD,
        isLg: width >= SCREEN.LG,
        isXl: width >= SCREEN.XL,
        isXXL: width >= SCREEN.XXL,
    };
};


import React from "react";
import cls from "./PhotoLoader.module.scss";

import background from "shared/assets/img/png/photobg.jpg";

const PhotoLoader = () => {
  return (
    <div className={cls.photoLoader}>
      <img src={background} className={cls.background} />
      <div className={cls.loaderWrapper}>
        <span className={cls.loader}></span>
      </div>
    </div>
  );
};

export { PhotoLoader };

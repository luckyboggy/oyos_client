import React from "react";
import cls from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div className={cls.preloader}>
      <div className={cls.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export { Preloader };

import React from "react";
import cls from "./Text.module.scss";

const Text = ({ children, size, position, padding, ff }) => {
  return (
    <div
      className={`${cls.text} ${cls[size]} ${cls[position]} ${cls[padding]} ${cls[ff]} `}
    >
      {children}
    </div>
  );
};

export { Text };

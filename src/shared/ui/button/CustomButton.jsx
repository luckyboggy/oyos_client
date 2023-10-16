import React from "react";
import cl from "./CustomButton.module.scss";

const CustomButton = ({ children, fontSize, margins, theme, ...props }) => {
  return (
    <button
      {...props}
      className={`${cl.customButton} ${cl[fontSize]} ${cl[theme]} ${cl[margins]}`}
    >
      {children.toUpperCase()}
    </button>
  );
};

export { CustomButton };

import React from "react";
import cls from "./CheckBox.module.scss";

const CheckBox = ({ children, checked, onChange, type, ...props }) => {
  return (
    <div className={cls.checkBox} {...props}>
      <input
        type={type}
        id={children}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={children}>{children}</label>
    </div>
  );
};

export { CheckBox };

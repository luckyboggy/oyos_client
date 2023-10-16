import React from "react";
import cl from "./CustomInput.module.scss";

const CustomInput = ({ size, margin, ...props }) => {
  const { readonly } = props;
  return (
    <input
      {...props}
      className={`${cl.customInput} ${cl[size]} ${cl[margin]} ${
        readonly ? cl["readonly"] : ""
      }`}
    />
  );
};

export { CustomInput };

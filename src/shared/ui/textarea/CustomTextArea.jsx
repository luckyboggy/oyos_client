import React from "react";
import cls from "./CustomTextArea.module.scss";

const CustomTextArea = ({ size = "m", ...props }) => {
  return <textarea {...props} className={`${cls.cTextAria} ${cls[size]}`} />;
};

export { CustomTextArea };

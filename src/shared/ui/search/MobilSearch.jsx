import React from "react";
import { CustomInput } from "shared/ui/input/CustomInput";
import cls from "./MobilSearch.module.scss";

const MobilSearch = ({ setMobilSearch }) => {
  const handleClose = (event) => {
    if (event.target.className === "mobilSearch") {
      setMobilSearch(false);
    }
  };

  return (
    <div className={cls.mobilSearch} onClick={(event) => handleClose(event)}>
      <div className={cls.searchWrapper}>
        <CustomInput />
      </div>
    </div>
  );
};

export { MobilSearch };

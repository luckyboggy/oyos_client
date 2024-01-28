import React from "react";
import cls from "./SideBar.module.scss";

const SideBar = ({ options, selected, setSelected }) => {
  return (
    <div className={cls.SideBar}>
      <div className={cls.items}>
        {options.map((option) => (
          <div className={cls.item}>{option.name}</div>
        ))}
      </div>
    </div>
  );
};

export { SideBar };

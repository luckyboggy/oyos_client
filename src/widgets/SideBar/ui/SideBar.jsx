import React from "react";
import cls from "./SideBar.module.scss";

const SideBar = ({ options, selected, setSelected }) => {
  return (
    <div className={cls.sidebar}>
      <div className={cls.choosenItem}>
        {options.find((option) => option.value === selected).name}
      </div>
      <div className={cls.items}>
        {options.map((option) => (
          <div
            className={`${cls.item} ${
              option.value === selected ? cls.selected : ""
            }`}
            key={option.name}
            onClick={() => {
              setSelected(option.value);
            }}
          >
            {option.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export { SideBar };

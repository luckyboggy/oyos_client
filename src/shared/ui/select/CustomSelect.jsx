import React from "react";
import cls from "./CustomSelect.module.scss";

const CustomSelect = ({ defValue, options, onChange, size, margins }) => {
  return (
    <select
      className={`${cls.cSelect} ${cls[size]} ${cls[margins]}`}
      onChange={(event) => onChange(event.target.value)}
    >
      {defValue && <option>{defValue}</option>}

      {options.map((option) => (
        <option
          className={cls.option}
          key={option.name}
          value={option.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export { CustomSelect };

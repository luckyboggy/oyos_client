import React, { useState } from "react";
import { ReactComponent as Arrow } from "shared/assets/img/svg/arrow.svg";
import cls from "./Select.module.scss";

const Select = ({ options, selected, setSelected, size, margins }) => {
  const [dropping, setDropping] = useState(false);

  return (
    <div className={cls.select}>
      {/* {dropping && (
        <div className={cls.opacity} onClick={() => setDropping(!dropping)}>
          >
        </div>
      )} */}

      <div className={cls.selectBtn} onClick={() => setDropping(!dropping)}>
        <div className={cls.selected}>
          {selected
            ? options.find((option) => option.value === selected).name
            : ""}
        </div>
        <Arrow className={`${cls.dropArrow} ${dropping ? cls.dropping : ""}`} />
      </div>

      {dropping && (
        <div className={`${cls.options} ${cls[size]}`}>
          {options.map((option) => (
            <div
              className={cls.option}
              key={option.name}
              onClick={() => {
                setSelected(option.value);
                setDropping(false);
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Select };

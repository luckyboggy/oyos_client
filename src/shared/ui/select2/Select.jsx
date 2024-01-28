import React, { useState, useContext } from "react";
import { Context } from "index.js";
import { ReactComponent as Arrow } from "shared/assets/img/svg/arrow.svg";
import { CheckBox } from "shared/ui/checkbox/CheckBox";
import cls from "./Select.module.scss";


const Select = ({
  options,
  selected,
  setSelected,
  size,
  type = "ordinary",
}) => {
  const [dropping, setDropping] = useState(false);

  const { product } = useContext(Context);

  const toggleSelectedType = (id) => {
    if (product.selectedType.includes(id)) {
      product.deleteFromSelectedType(id);
    } else {
      product.addSelectedType(id);
    }
  };

  return (
    <div className={`${cls.select} ${cls[size]}`}>
      <div className={cls.selectBtn} onClick={() => setDropping(!dropping)}>
        <div className={cls.selected}>
          {selected && type === "ordinary"
            ? options.find(
                (option) => option.value.toString() === selected.toString()
              ).name
            : ""}
          {selected && type === "checkbox" ? `${selected}` : ""}
        </div>
        <Arrow className={`${cls.dropArrow} ${dropping ? cls.dropping : ""}`} />
      </div>

      {dropping && (
        <div
          className={`${cls.opacity}`}
          onClick={() => setDropping(false)}
        ></div>
      )}

      {dropping && (
        <div>
          {type === "ordinary" && (
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
          {type === "checkbox" && (
            <div className={`${cls.options} ${cls[size]}`}>
              {options.map((option) => (
                <CheckBox
                  className={cls.checkOption}
                  key={option.id}
                  type={"checkbox"}
                  checked={product.selectedType.includes(option.id)}
                  onChange={() => {
                    console.log(option.id)
                    toggleSelectedType(option.id);
                  }}
                >
                  {option.name}
                </CheckBox>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { Select };

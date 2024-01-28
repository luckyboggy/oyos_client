import React, { useState, useContext } from "react";
import { Context } from "index.js";
import { CheckBox } from "shared/ui/checkbox/CheckBox";
import { ReactComponent as Arrow } from "shared/assets/img/svg/arrow.svg";
import { CustomButton } from "shared/ui/button/CustomButton";
import { SORT_TYPES } from "app/utils/consts";
import cls from "./Filters.module.scss";

const Filters = ({ closeModal }) => {
  const [types, setTypes] = useState(false);

  const { product } = useContext(Context);

  const toggleSelectedType = (id) => {
    if (product.selectedType.includes(id)) {
      product.deleteFromSelectedType(id);
    } else {
      product.addSelectedType(id);
    }
  };

  return (
    <div className={cls.filters}>
      <div className={cls.sort}>
        <div className={cls.sortTitle}>Сортировка</div>
        <div className={cls.sortTypes}>
          {SORT_TYPES.map((sortType) => (
            <CheckBox
              key={sortType.name}
              type={"radio"}
              checked={product.sortType.name === sortType.name}
              onChange={() => {
                product.setSortType(sortType);
              }}
            >
              {sortType.name}
            </CheckBox>
          ))}
        </div>
      </div>
      <hr />
      <div className={cls.types}>
        <div className={cls.typesTitle} onClick={() => setTypes(!types)}>
          <div>Категории</div>
          <Arrow className={`${cls.dropArrow} ${types ? cls.active : ""}`} />
        </div>
        {types &&
          product.types.map((type) => (
            <CheckBox
              key={type.name}
              type={"checkbox"}
              checked={product.selectedType.includes(type.id)}
              onChange={() => {
                toggleSelectedType(type.id);
              }}
            >
              {type.name}
            </CheckBox>
          ))}
      </div>
      <hr />
      <div className={cls.accceptBtn}>
        <CustomButton
          fontSize={"m"}
          onClick={() => {
            console.log(product.selectedType);
            closeModal(false);
          }}
        >
          Применить
        </CustomButton>
      </div>
    </div>
  );
};

export { Filters };

import React, { useState, useContext, useEffect } from "react";
import { Context } from "index.js";
import { CheckBox } from "shared/ui/checkbox/CheckBox";
import { ReactComponent as Arrow } from "shared/assets/img/svg/arrow.svg";
import cls from "./Filters.module.scss";
import { CustomButton } from "shared/ui/button/CustomButton";

const Filters = ({ closeModal }) => {
  const sortTypes = [
    { name: "По умолчанию", value: ["updatedAt", "DESC"] },
    { name: "Новинки", value: ["updatedAt", "DESC"] },
    { name: "Дешевле", value: ["price", "ASC"] },
    { name: "Дороже", value: ["price", "DESC"] },
  ];

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
          {sortTypes.map((sortType) => (
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

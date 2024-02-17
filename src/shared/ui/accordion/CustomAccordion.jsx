import React, { useState } from "react";
import { ReactComponent as Arrow } from "shared/assets/img/svg/arrow.svg";
import cls from "./CustomAccordion.module.scss";

const CustomAccordion = ({ title, items, content }) => {
  const [contentVisible, setContentVisible] = useState(false);

  return (
    <div className={cls.customAccordion}>
      <div
        className={cls.header}
        onClick={() => setContentVisible(!contentVisible)}
      >
        <div className={cls.title}>{title}</div>
        <Arrow
          className={`${cls.arrow} ${
            contentVisible ? cls.visible : ""
          }`}
        />
      </div>
      {contentVisible && (
        <div className={cls.content}>
          {items &&
            items.map((type) => (
              <div className={cls.item}>{type.name}</div>
            ))}
          {content}
        </div>
      )}
    </div>
  );
};

export { CustomAccordion };

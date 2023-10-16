import React, { useState } from "react";
import { ReactComponent as Arrow } from "shared/assets/img/svg/arrow.svg";
import classes from "./CustomAccordion.module.scss";

const CustomAccordion = ({ title, items }) => {
  const [contentVisible, setContentVisible] = useState(false);

  return (
    <div className={classes.customAccordion}>
      <div
        className={classes.ac__header}
        onClick={() => setContentVisible(!contentVisible)}
      >
        <div className={classes.ac__header_title}>{title}</div>
        <Arrow
          className={`${classes.ac__header_arrow} ${
            contentVisible ? classes.visible : ""
          }`}
        />
      </div>
      {contentVisible && (
        <div className={classes.ac__content}>
          {items.map((type) => (
            <div className={classes.ac__content_item}>{type.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;

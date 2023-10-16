import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "shared/assets/img/svg/arrow.svg";
import cl from "./CustomDropDown.module.scss";

const CustomDropDown = ({ title, content }) => {
  const [dropDown, setSropDown] = useState(false);

  return (
    <div className={cl.dropDown}>
      <div className={cl.dropDownTitle} onClick={() => setSropDown(!dropDown)}>
        <div>{title}</div>
        <Arrow className={`${cl.dropArrow} ${dropDown ? cl.active : ""}`} />
      </div>
      {dropDown && (
        <div className={cl.dropDownContent}>
          {content.map((item) => (
            <Link
              key={item.name}
              className={cl.dropDownItem}
              to={item.link}
              onClick={() => setSropDown(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export { CustomDropDown };

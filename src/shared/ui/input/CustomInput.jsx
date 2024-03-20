import React, { useState } from "react";
import cl from "./CustomInput.module.scss";

const CustomInput = ({
  size,
  margin,
  emptyCheck = false,
  emptyLabel,
  ...props
}) => {
  const { readonly } = props;

  const [isEmpty, setIsEmpty] = useState(false);
  return (
    <div className={cl.inputWrapper}>
      {" "}
      <input
        {...props}
        id={"input"}
        onBlur={(event) => {
          event.target.value === "" ? setIsEmpty(true) : setIsEmpty(false);
        }}
        onFocus={() => setIsEmpty(false)}
        className={`${cl.customInput} ${cl[size]} ${cl[margin]} ${
          readonly ? cl["readonly"] : ""
        } ${isEmpty && emptyCheck ? cl["error"] : ""}`}
      />
      {isEmpty && emptyCheck && (
        <label htmlFor="input" className={cl.inputLabel}>
          {emptyLabel}
        </label>
      )}
    </div>
  );
};

export { CustomInput };

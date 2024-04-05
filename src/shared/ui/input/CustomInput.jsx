import React, { useState } from "react";
import cl from "./CustomInput.module.scss";

const CustomInput = ({
  size,
  margin,
  emptyCheck = false,
  emptyLabel,
  errorLabel,
  style,
  ...props
}) => {
  const { readonly } = props;

  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <div className={cl.inputWrapper}>
      {" "}
      <input
        {...props}
        id={"input"}
        onBlur={(event) => {
          event.target.value === "" ? setIsEmpty(true) : setIsEmpty(false);
          errorLabel === "Введите корректный email"
            ? setIsError(true)
            : setIsError(false);
        }}
        onFocus={() => {
          setIsEmpty(false);
          setIsError(false);
        }}
        className={`${cl.customInput} ${cl[size]} ${cl[margin]} ${cl[style]} ${
          readonly ? cl["readonly"] : ""
        } ${isEmpty && emptyCheck ? cl["error"] : ""} ${
          isError ? cl["error"] : ""
        }`}
      />
      {isEmpty && emptyCheck && (
        <label htmlFor="input" className={cl.inputLabel}>
          {emptyLabel}
        </label>
      )}
      {isError && !isEmpty && (
        <label htmlFor="input" className={cl.inputLabel}>
          {errorLabel}
        </label>
      )}
    </div>
  );
};

export { CustomInput };

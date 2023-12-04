import React, { useState } from "react";
import { ReactComponent as Search } from "shared/assets/img/svg/search.svg";
import { CustomInput } from "shared/ui/input/CustomInput";
import cls from "./SearchInput.module.scss";

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={cls.searchInput}>
      <input
        className={cls.search}
        value={searchValue}
        onChange={handleSearchChange}
        onMouseOut={(event) => {
          event.target.value = "";
          event.target.blur();
        }}
      ></input>
      <Search className={cls.searchIcon} />
    </div>
  );
};

import React, { useState, useContext } from "react";
import { Context } from "index.js";
import { ReactComponent as Search } from "shared/assets/img/svg/search.svg";
import { CustomInput } from "shared/ui/input/CustomInput";
import { observer } from "mobx-react-lite";
import cls from "./SearchInput.module.scss";

export const SearchInput = observer(
  ({ searchValue = "", changeSearchValue }) => {
    const { user } = useContext(Context);

    return (
      <div
        className={`${cls.searchInput} ${user.searching ? cls.searching : ""}`}
      >
        <input
          className={cls.search}
          value={searchValue}
          onChange={changeSearchValue}
          onMouseOut={(event) => {
            //event.target.value = "";
            //event.target.blur();
          }}
        ></input>
        <Search
          className={cls.searchIcon}
          onClick={() => {
            user.setSearching(true);
          }}
        />

      </div>
    );
  }
);

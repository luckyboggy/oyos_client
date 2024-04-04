import React, { useState, useContext, useRef, useEffect } from "react";
import { Context } from "index.js";
import { useNavigate } from "react-router-dom";
import { SEARCH_ROUTE } from "app/utils/consts.js";
import { ReactComponent as Search } from "shared/assets/img/svg/search.svg";
import { observer } from "mobx-react-lite";
import cls from "./SearchInput.module.scss";

export const SearchInput = observer(({ searchValue, changeSearchValue }) => {
  const { user } = useContext(Context);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const isSearching = user.searching;

  useEffect(() => {}, [user.searching]);

  return (
    <div className={`${cls.searchInput} ${isSearching ? cls.searching : ""}`}>
      <input
        ref={inputRef}
        className={cls.search}
        //value={searchValue}
        value={isSearching ? user.searchValue : ""}
        readOnly={!isSearching}
        onChange={(event) => {
          user.setSearchValue(event.target.value);
        }}
      ></input>

      <Search
        className={cls.searchIcon}
        onClick={() => {
          if (!isSearching) {
            if (inputRef.current) {
              user.setSearchValue("");
              inputRef.current.focus();
            }
            user.setSearching(true);
          } else {
            if (user.searchValue.length >= 2) {
              user.setSearching(false);
              navigate("../" + SEARCH_ROUTE);
            }
          }
        }}
      />
    </div>
  );
});

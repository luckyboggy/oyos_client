import React, { useState, useContext } from "react";
import { Context } from "index.js";
import { SearchInput } from "shared/ui/search";
import { SearchResult } from "shared/ui/search";
import cls from "./Search.module.scss";
import { observer } from "mobx-react-lite";

const Search = observer(() => {
  const { user } = useContext(Context);

  const closeSearch = () => {
    user.setSearching(false);
  };

  return (
    <div className={cls.search}>
      <SearchInput />
      {user.searching && (
        <div>
          <div className={cls.overlay} onClick={closeSearch}></div>
          <SearchResult />
        </div>
      )}
    </div>
  );
});

export { Search };

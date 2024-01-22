import React, { useState, useContext, useEffect } from "react";
import { Context } from "index.js";
import { SearchInput } from "shared/ui/search";
import { SearchResult } from "shared/ui/search";
import cls from "./Search.module.scss";
import { observer } from "mobx-react-lite";

const Search = observer(() => {
  const { user } = useContext(Context);
  const [show, setShow] = useState("");

  const closeSearch = () => {
    user.setSearching(false);
  };

  useEffect(() => {
    setShow("show");
  }, []);

  return (
    <div className={cls.search}>
      {user.searching && (
        <div className={cls.headerBlocker} onClick={closeSearch}></div>
      )}

      <SearchInput />
      {user.searching && (
        <div>
          <div
            className={`${cls.overlay} ${cls[show]}`}
            onClick={closeSearch}
          ></div>
          <SearchResult />
        </div>
      )}
    </div>
  );
});

export { Search };

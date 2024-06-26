import React, { useContext} from "react";
import { Context } from "index.js";
import { SearchInput, SearchVariants } from "shared/ui/search";
import cls from "./Search.module.scss";
import { observer } from "mobx-react-lite";

const Search = observer(() => {
  const { user } = useContext(Context);

  const closeSearch = () => {
    user.setSearching(false);
    user.setSearchValue("");
  };

  return (
    <div className={cls.search}>
      {user.searching && (
        <div className={cls.blocker} onClick={closeSearch}></div>
      )}
      <SearchInput
        searchValue={user.searchValue}
        changeSearchValue={user.setSearchValue}
      />
      {user.searchValue.length >= 2 && user.searching && <SearchVariants />}
    </div>
  );
});

export { Search };

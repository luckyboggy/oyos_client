import React, { useState, useContext } from "react";
import { Context } from "index.js";
import { CustomInput } from "shared/ui/input/CustomInput";
import { ReactComponent as Search } from "shared/assets/img/svg/search.svg";
import { Preloader } from "shared/ui/preloader/Preloader";
import { ProductList } from "widgets/ProductList/ui/ProductList/ProductList.jsx";
import { Text } from "shared/ui/text/Text";
import { observer } from "mobx-react-lite";
import cls from "./SearchPage.module.scss";
import { SearchList } from "shared/ui/search";

export const SearchPage = observer(() => {
  const { user } = useContext(Context);

  const [fetchSearcing, setFetchSearching] = useState(true);

  return (
    <div className={cls.searchPage}>
      <Text size={"m"} position={"center"} padding={"pv1"}>
        Результаты поиска
      </Text>
      <div className={cls.searchQuery}>
        <CustomInput
          value={user.searchValue}
          style={"borderBottom"}
          onChange={(event) => {
            user.setSearchValue(event.target.value);
          }}
        />
        <Search className={cls.searchIcon} onClick={() => {}} />
      </div>

      {/* <div className={cls.lastQuery}></div> */}

      <div className={cls.searchResults}>
        {fetchSearcing ? <Preloader /> : <SearchList />}
      </div>
    </div>
  );
});

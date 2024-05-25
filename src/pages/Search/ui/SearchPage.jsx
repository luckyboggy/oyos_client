import React, { useState, useContext, useEffect } from "react";
import { Context } from "index.js";
import { CustomInput } from "shared/ui/input/CustomInput";
import { useSearchedProducts } from "shared/lib/hooks/useSearch";
import { ReactComponent as Search } from "shared/assets/img/svg/search.svg";
import { Preloader } from "shared/ui/preloader/Preloader";
import { SearchList } from "shared/ui/search";
import { Text } from "shared/ui/text/Text";
import { fetchProducts } from "http/productAPI";
import { observer } from "mobx-react-lite";
import cls from "./SearchPage.module.scss";

const SearchPage = observer(() => {
  const { user } = useContext(Context);

  const [fetchSearcing, setFetchSearching] = useState(true);
  const [localSearchValue, setLocalSearchValue] = useState(user.searchValue);
  const [productsForSearching, setProductForSearching] = useState([]);

  useEffect(() => {
    fetchProducts(null, null, null, null, null)
      .then((data) => {
        setProductForSearching(data.rows);
      })
      .then(() => {
        setFetchSearching(false);
      });
  }, [user.searchValue]);

  const sl = useSearchedProducts(productsForSearching, user.searchValue);

  return (
    <div className={cls.searchPage}>
      <Text size={"m"} position={"center"} padding={"pv1"}>
        Результаты поиска
      </Text>
      <div className={cls.searchQuery}>
        <CustomInput
          value={localSearchValue}
          style={"borderBottom"}
          onChange={(event) => {
            setLocalSearchValue(event.target.value);
          }}
        />
        <Search
          className={cls.searchIcon}
          onClick={() => {
            user.setSearchValue(localSearchValue);
          }}
        />
      </div>

      <div className={cls.searchResults}>
        {fetchSearcing ?? localSearchValue.length >= 2 ? (
          <Preloader />
        ) : (
          <SearchList searchItems={sl} />
        )}
      </div>
    </div>
  );
});

export default SearchPage;

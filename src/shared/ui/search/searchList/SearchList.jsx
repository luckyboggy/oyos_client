import React, { useContext } from "react";
import { ProductItem } from "widgets/ProductList/ui/ProductItem/ProductItem";
import { Context } from "index.js";

import { observer } from "mobx-react-lite";
import cls from "./SearchList.module.scss";
import { Text } from "shared/ui/text/Text";

export const SearchList = observer(({ searchItems = [] }) => {
  const { user } = useContext(Context);

  return (
    <div>
      {searchItems.length === 0 ? (
        <div>
          <Text position={"center"} padding={"pv2"}>
            Ничего не найдено...
          </Text>
        </div>
      ) : (
        <div className={cls.searchList}>
          {searchItems.map((item) => (
            <ProductItem key={item.name} item={item} />
          ))}
        </div>
      )}
    </div>
  );
});

import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE, SHOP_ROUTE } from "app/utils/consts.js";
import { Context } from "index.js";
import { Text } from "shared/ui/text/Text";
import cls from "./SearchVariants.module.scss";
import {
  useSeachedTypes,
  useSearchedProducts,
} from "shared/lib/hooks/useSearch";
import { fetchProducts } from "http/productAPI";

export const SearchVariants = () => {
  const { product, user } = useContext(Context);
  const navigate = useNavigate();
  const [productsForSearching, setProductForSearching] = useState([]);

  const noType =
    useSearchedProducts(productsForSearching, user.searchValue).length === 0;
  const noProduct =
    useSeachedTypes(product.types, user.searchValue).length === 0;

  useEffect(() => {
    fetchProducts(null, null, null, null, null).then((data) => {
      setProductForSearching(data.rows);
    });
  }, [user.searchValue]);

  return (
    <div className={cls.searchVariants}>
      {useSeachedTypes(product.types, user.searchValue).map((type) => (
        <div
          key={type.value}
          className={cls.variantsItem}
          onClick={() => {
            product.setSelectedType(type);
            navigate("../" + SHOP_ROUTE);
            user.setSearching(false);
          }}
        >
          <Text size={"s"}>{type.name.toLowerCase()}</Text>
        </div>
      ))}
      {useSearchedProducts(productsForSearching, user.searchValue).map(
        (product) => (
          <div
            key={product.value}
            className={cls.variantsItem}
            onClick={() => {
              navigate("../" + PRODUCT_ROUTE + "/" + product.id);
              user.setSearching(false);
            }}
          >
            <Text size={"s"}>{product.name.toLowerCase()}</Text>
          </div>
        )
      )}
      {noType && noProduct && (
        <div className={cls.variantsItem}>
          <Text size={"s"}>ничего не найдено...</Text>
        </div>
      )}
    </div>
  );
};

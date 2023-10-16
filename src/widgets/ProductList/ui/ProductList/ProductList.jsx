import React, { useContext } from "react";
import { ProductItem } from "../ProductItem/ProductItem";
import { Context } from "index.js";
import { observer } from "mobx-react-lite";
import cls from "./ProductList.module.scss";

const ProductList = observer(() => {
  const { product } = useContext(Context);

  return (
    <div className={cls.productList}>
      {product.items.map((item) => (
        <ProductItem key={item.name} item={item} />
      ))}
    </div>
  );
});

export { ProductList };

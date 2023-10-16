import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "app/utils/consts.js";
import { ReactComponent as Close } from "shared/assets/img/svg/close.svg";
import { fetchOneProduct } from "http/productAPI.js";
import { handleRemoveFromBasket } from "shared/lib/functions/basketFunctions";
import cls from "./BasketItem.module.scss";

const BasketItem = ({ item }) => {
  const { productId, selectedSize } = item;
  const [basketItem, setBasketItem] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchOneProduct(productId).then((data) => setBasketItem(data));
  }, []);

  return (
    <div className={cls.basketProduct}>
      <div className={cls.content}>
        <div
          className={cls.basketProductImg}
          onClick={() => {
            navigate("../" + PRODUCT_ROUTE + "/" + productId);
          }}
        >
          {basketItem.img && (
            <img
              src={process.env.REACT_APP_API_URL + basketItem.img[0]}
              key={basketItem.img[0]}
            />
          )}
        </div>
        <div className={cls.info}>
          <div className={cls.title}>
            <div className={cls.name}>{basketItem.name}</div>
            <Close
              className={cls.removeBtn}
              onClick={() => handleRemoveFromBasket(productId, selectedSize)}
            />
          </div>
          <div className={cls.price}>
            {basketItem.price && basketItem.price.toLocaleString()} р
          </div>
          {selectedSize !== "unified" && (
            <div className={cls.size}>Размер: {selectedSize}</div>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export { BasketItem };

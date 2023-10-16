import React from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "app/utils/consts.js";
import {
  isInFavorites,
  toggleFavorite,
} from "shared/lib/functions/favoritesFunctions.js";
import { ReactComponent as Like } from "shared/assets/img/svg/like.svg";
import { observer } from "mobx-react-lite";
import cls from "./ProductItem.module.scss";
import { PhotoLoader } from "shared/ui/photoLoader/PhotoLoader";


const ProductItem = observer(({ item }) => {

  const { id, name, price, img } = item;
  const navigate = useNavigate();
  const favorite = isInFavorites(id);


  return (
    <div
      className={cls.productItem}
      onClick={(event) => {
        event.stopPropagation();
        if (
          event.target.className !== "productBtn" &&
          event.target.className !== "productBtn_order" &&
          event.target.className !== "prodictLike"
        ) {
          navigate("../" + PRODUCT_ROUTE + "/" + id);
        }
      }}
    >
      <div className={cls.wrapper}>
        <div className={cls.productImg}>
          {img[0] ? (
            <img src={process.env.REACT_APP_API_URL + img[0]} alt={name} />
          ) : (
            <PhotoLoader />
          )}
        </div>
        <div
          className={cls.like}
          onClick={(event) => {
 
            toggleFavorite(event, id, favorite);
          }}
        >
          <Like className={`${cls.prodictLike} ${favorite ? cls.liked : ""}`} />
        </div>
      </div>

      <div className={cls.productContent}>
        <div className={cls.productName}>{name}</div>
        <div className={cls.productPrice}>{price.toLocaleString()} р.</div>
      </div>
    </div>
  );
});

export { ProductItem };

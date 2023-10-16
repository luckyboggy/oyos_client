import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "app/utils/consts.js";
import {
  isInFavorites,
  toggleFavorite,
} from "shared/lib/functions/favoritesFunctions.js";
import { ReactComponent as Like } from "shared/assets/img/svg/like.svg";
import { observer } from "mobx-react-lite";
import { PhotoLoader } from "shared/ui/photoLoader/PhotoLoader";
import { fetchOneProduct } from "http/productAPI.js";
import cls from "./FavoritesItem.module.scss";

const FavoritesItem = observer(({ item }) => {
  const { productId } = item;
  const [favoritesItem, setFavoritesItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const favorite = isInFavorites(favoritesItem.id);

  useEffect(() => {
    fetchOneProduct(productId)
      .then((data) => setFavoritesItem(data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      className={cls.favoritesItem}
      onClick={(event) => {
        event.stopPropagation();
        if (
          event.target.className !== "productBtn" &&
          event.target.className !== "productBtn_order" &&
          event.target.className !== "prodictLike"
        ) {
          navigate("../" + PRODUCT_ROUTE + "/" + favoritesItem.id);
        }
      }}
    >
      {!loading && (
        <div className={cls.wrapper}>
          <div className={cls.productImg}>
            {favoritesItem.img[0] ? (
              <img
                src={process.env.REACT_APP_API_URL + favoritesItem.img[0]}
                alt={favoritesItem.name}
              />
            ) : (
              <PhotoLoader />
            )}
          </div>
          <div
            className={cls.like}
            onClick={(event) => {
              toggleFavorite(event, favoritesItem.id, favorite);
            }}
          >
            <Like
              className={`${cls.prodictLike} ${favorite ? cls.liked : ""}`}
            />
          </div>
        </div>
      )}
      <div className={cls.productContent}>
        <div className={cls.productName}>{favoritesItem.name}</div>
        <div className={cls.productPrice}>{favoritesItem.price} р.</div>
      </div>
    </div>
  );
});

export { FavoritesItem };

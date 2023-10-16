import React, { useContext } from "react";
import { FavoritesItem } from "../../FavoritesItem/FavoritesItem";
import { Context } from "index.js";
import cls from "./FavoritesList.module.scss";

const FavoritesList = () => {
  const { user } = useContext(Context);

  return (
    <div className={cls.favoritesList}>
      {user.isAuth
        ? user.favoritesItems.map((item) => (
            <FavoritesItem key={item.id} item={item} />
          ))
        : user.localFavorites.map((item) => (
            <FavoritesItem key={item.productId} item={item} />
          ))}
    </div>
  );
};

export { FavoritesList };

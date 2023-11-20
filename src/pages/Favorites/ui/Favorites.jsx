import React, { useContext, useEffect } from "react";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { Context } from "index.js";
import { Text } from "shared/ui/text/Text";
import { CustomButton } from "shared/ui/button/CustomButton";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { FavoritesList } from "widgets/FavoritesList/ui/FavoritesList/ui/FavoritesList";
import cls from "./Favorites.module.scss";

import logo from "shared/assets/img/png/logo.png";

const Favorites = observer(() => {
  const { user } = useContext(Context);
  const isSm = useScreenSize().isSm;

  useEffect(() => {}, [user.localFavorites, user.favoritesItems]);

  return (
    <div className={cls.favorites}>
      {!user.isAuth && (
        <div className={cls.unauthorized}>
          <div className={cls.toAuth}>
            <Text size={"m"} position={"center"} padding={"pv1"}>
              Избранное
            </Text>
            {isSm ? (
              <div>
                <Link to="/login" className={cls.link}>
                  <Text size={"s"} position={"center"} padding={"pv2"}>
                    Войдите в аккаунт, чтобы смотреть избранное на любом
                    устройстве >
                  </Text>
                </Link>

                <div className={cls.logo}>
                  <img src={logo} alt="logo" className={cls.logoImg} />
                </div>
                <Link to="/shop" className={cls.link}>
                  <Text size={"s"} position={"center"} padding={"pv2"}>
                    В магазин >
                  </Text>
                </Link>
              </div>
            ) : (
              <div>
                <Text size={"s"} position={"left"} padding={"pv2"}>
                  Войдите в аккаунт, чтобы смотреть избранное на любом
                  устройстве
                </Text>
                <Link to="/login">
                  <CustomButton fontSize={"s"}>Войти</CustomButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={cls.favoritesList}>
        {user.favoritesItems.length !== 0 ||
        user.localFavorites.length !== 0 ? (
          <div className={cls.title}>Вам понравилось</div>
        ) : (
          <div className={cls.title}>Вы пока не нашли своё</div>
        )}

        <FavoritesList />
      </div>
    </div>
  );
});

export { Favorites };

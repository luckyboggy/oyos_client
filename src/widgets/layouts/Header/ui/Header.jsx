import React, { useContext, useState, useEffect } from "react";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { Link } from "react-router-dom";
import { ReactComponent as Basket } from "shared/assets/img/svg/basket.svg";
import { ReactComponent as Like } from "shared/assets/img/svg/like.svg";
import { ReactComponent as Burger } from "shared/assets/img/svg/burger.svg";
import { ReactComponent as Auth } from "shared/assets/img/svg/person.svg";
import { Context } from "index.js";
import { observer } from "mobx-react-lite";
import { Search } from "widgets/Search";
import cls from "./Header.module.scss";

const Header = observer(({ setMobileMenu, theme }) => {
  const { user } = useContext(Context);

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setIsHeaderVisible(
        prevScrollPosition > currentScrollPosition || currentScrollPosition < 10
      );
      setPrevScrollPosition(currentScrollPosition);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPosition]);

  /* const headerClass = `${cls.header} ${cls[theme]}  ${
    isHeaderVisible ? cls.show : cls.hide
  }  ${user.searching ? cls.white : ""}`; */

  const headerClass = `${cls.header} ${cls[theme]}  ${
    isHeaderVisible ? cls.show : cls.hide
  } `;

  return (
    <header className={headerClass}>
      <div className={cls.wrapper}>
        {useScreenSize().isMd ? (
          <div className={cls.naviBar}>
            <Link to="shop" className={cls.naviLink}>
              Магазин
            </Link>
            <Link to="workshops" className={cls.naviLink}>
              Мастер-классы
            </Link>
          </div>
        ) : (
          <div className={cls.burger}>
            <Burger
              className={cls.burgerIcon}
              onClick={() => setMobileMenu(true)}
            />
          </div>
        )}

        <div className={cls.logo}>
          <Link to="">OLGA YUDINA</Link>
        </div>

        {useScreenSize().isLg && (
          <div className={cls.search}>
            <Search />
          </div>
        )}

        <div className={cls.icons}>
          <Link to="favorites" className={cls.link}>
            <Like className={`${cls.icon} ${cls.like}`} />
          </Link>
          <Link to="basket" className={cls.link}>
            <div className={cls.basketIcon}>
              <Basket className={cls.icon} />

              {user.isAuth
                ? user.basketCount > 0 && (
                    <div className={cls.basketCount}>{user.basketCount}</div>
                  )
                : user.localBasket.length > 0 && (
                    <div className={cls.basketCount}>
                      {user.localBasket.length}
                    </div>
                  )}
            </div>
          </Link>
          {useScreenSize().isMd && (
            <Link
              to={
                user.isAuth && user.user.role === "ADMIN"
                  ? "admin"
                  : user.isAuth && user.user.role === "USER"
                  ? "user"
                  : "login"
              }
              className={cls.link}
            >
              <Auth className={cls.icon} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
});

export { Header };

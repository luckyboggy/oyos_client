import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Basket } from "shared/assets/img/svg/basket.svg";
import { ReactComponent as Like } from "shared/assets/img/svg/like.svg";
import { ReactComponent as Burger } from "shared/assets/img/svg/burger.svg";
import { Context } from "index.js";
import { observer } from "mobx-react-lite";
import cls from "./Header.module.scss";

const Header = observer(
  ({ setMobileMenu, setMobilSearch, mobilSearch, theme }) => {
    const { user } = useContext(Context);

    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [prevScrollPosition, setPrevScrollPosition] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPosition = window.pageYOffset;
        setIsHeaderVisible(
          prevScrollPosition > currentScrollPosition ||
            currentScrollPosition < 10
        );
        setPrevScrollPosition(currentScrollPosition);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [prevScrollPosition]);

    const headerClass = `${cls.header} ${cls[theme]} ${
      isHeaderVisible ? cls.show : cls.hide
    }  `;

    return (
      <header className={headerClass}>
        <div className={cls.wrapper}>
          <div className={cls.burger}>
            <Burger
              className={cls.burgerIcon}
              onClick={() => setMobileMenu(true)}
            />
          </div>
          <div className={cls.naviBar}></div>
          <div className={cls.logo}>
            <Link to="">OLGA YUDINA</Link>
          </div>
          <div className={cls.naviBar}>
            <Link to="shop">collection</Link>
            <Link to="about">about</Link>
            <Link to="delivery">delivery</Link>
          </div>
          <div className={cls.icons}>
            {/* <Search
            className={cls.icon}
            onClick={() => setMobilSearch(!mobilSearch)}
          />
          {user.isAuth && user.user.role === "ADMIN" && (
            <Link to="admin">
              <Auth className={cls.icon} />
            </Link>
          )}
          {user.isAuth && user.user.role === "USER" && (
            <Link to="user">
              <Auth className={cls.icon} />
            </Link>
          )}

          {!user.isAuth && (
            <Link to="login">
              <Auth className={cls.icon} />
            </Link>
          )} */}
            <Link to="favorites">
              <Like className={`${cls.icon} ${cls.like}`} />
            </Link>
            <Link to="basket">
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
          </div>
        </div>
      </header>
    );
  }
);

export { Header };

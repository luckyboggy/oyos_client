import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Close } from "shared/assets/img/svg/close.svg";
import { ReactComponent as Search } from "shared/assets/img/svg/search.svg";
import { ReactComponent as Arrow } from "shared/assets/img/svg/arrow.svg";
import { Context } from "index.js";
import { observer } from "mobx-react-lite";
import { fetchTypes } from "http/productAPI.js";
import cls from "./MobileMenu.module.scss";

const MobileMenu = observer(({ mobileMenu, setMobileMenu }) => {
  const [collection, setCollection] = useState(false);
  const { product, user } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data));
  }, [collection]);

  return (
    <div className={`${cls.mobileMenu} ${mobileMenu ? cls.activeMenu : ""}`}>
      <div className={cls.header}>
        <Close
          className={cls.close}
          onClick={() => {
            setMobileMenu(false);
            setCollection(false);
          }}
        />
        <Search className={cls.search} />
      </div>
      <hr />
      <div className={cls.content}>
        {/* dd */}
        <div className={cls.item} onClick={() => setCollection(!collection)}>
          <div className={cls.title}>
            <div>Магазин</div>
            <Arrow
              className={`${cls.dropArrow} ${collection ? cls.active : ""}`}
            />
          </div>
          {collection && (
            <div className={cls.dropDown}>
              <Link
                className={cls.ddItem}
                to="shop"
                onClick={() => {
                  product.setSelectedType([]);
                  setMobileMenu(false);
                }}
              >
                смотреть все 
              </Link>
              {product.types.map((type) => (
                <Link
                  key={type.name}
                  className={cls.ddItem}
                  to="shop"
                  onClick={() => {
                    product.setSelectedType(type);
                    setMobileMenu(false);
                  }}
                >
                  {type.name /* .toLowerCase() */}
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* dd end */}
        <div className={cls.item}>
          <Link
            className={cls.title}
            to="favorites"
            onClick={() => setMobileMenu(false)}
          >
            Избранное
          </Link>
        </div>
        <div className={cls.item}>
          <Link
            className={cls.title}
            to="workshops"
            onClick={() => setMobileMenu(false)}
          >
            Мастер-классы
          </Link>
        </div>
        <div className={cls.item}>
          <Link
            className={cls.title}
            to="about"
            onClick={() => setMobileMenu(false)}
          >
            О бренде
          </Link>
        </div>
        <div className={cls.item}>
          <Link
            className={cls.title}
            to="delivery"
            onClick={() => setMobileMenu(false)}
          >
            Доставка и оплата
          </Link>
        </div>

        <div className={cls.item}>
          {user.isAuth && user.user.role === "ADMIN" && (
            <Link
              to="admin"
              className={cls.title}
              onClick={() => setMobileMenu(false)}
            >
              Администрирование
            </Link>
          )}
          {user.isAuth && user.user.role === "USER" && (
            <Link
              to="user"
              className={cls.title}
              onClick={() => setMobileMenu(false)}
            >
              Личный кабинет
            </Link>
          )}

          {!user.isAuth && (
            <Link
              to="login"
              className={cls.title}
              onClick={() => setMobileMenu(false)}
            >
              Войти
            </Link>
          )}
        </div>
      </div>
      <div className="mobileMenu__nav"></div>
    </div>
  );
});

export { MobileMenu };

import React, { useContext, useState, useEffect } from "react";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { useLocation } from "react-router-dom";
import { MobileMenu } from "widgets/MobileMenu";
import { Context } from "index.js";
import { observer } from "mobx-react-lite";
import { check } from "http/userAPI.js";
import { getBasket } from "http/basketAPI.js";
import { fetchBasketProduct } from "http/basketProductAPI.js";
import { getFavorites } from "http/favoritesAPI.js";
import { fetchFavoritesProduct } from "http/favoritesProductAPI.js";
import { Footer } from "widgets/layouts/Footer";
import { Header } from "widgets/layouts/Header";
import { MobilSearch } from "shared/ui/search/MobilSearch";
import { AppRouter } from "./providers/router";

const App = observer(() => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobilSearch, setMobilSearch] = useState(false);
  const [headerTheme, setHeaderTheme] = useState("");
  const [footerTheme, setFooterTheme] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setHeaderTheme("main");
    } else {
      setHeaderTheme("");
    }
    if (location.pathname.match(/^\/product\/\d+$/)) {
      setFooterTheme("product");
    } else {
      setFooterTheme("");
    }
  }, [location]);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .then(() => {
        getBasket(user.user.id)
          .then((data) => {
            user.setBasketId(data.id);
          })
          .then(() => {
            fetchBasketProduct(user.basketId).then((data) => {
              user.setBasketCount(data.count);
              user.setBasketItems(data.rows);
            });
          });
      })
      .then(() => {
        getFavorites(user.user.id)
          .then((data) => {
            user.setFavoriteId(data.id);
          })
          .then(() => {
            fetchFavoritesProduct(user.favoriteId).then((data) => {
              user.setFavoritesItems(data.rows);
            });
          });
      })
      .catch(() => {
        if (localStorage.getItem("localBasket")) {
          user.parseLocalBasket(
            JSON.parse(localStorage.getItem("localBasket"))
          );
        }
        if (localStorage.getItem("localFavorites")) {
          user.parseLocalFavorites(
            JSON.parse(localStorage.getItem("localFavorites"))
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      <Header
        setMobileMenu={setMobileMenu}
        setMobilSearch={setMobilSearch}
        mobilSearch={mobilSearch}
        theme={headerTheme}
      />
      {mobilSearch && <MobilSearch setMobilSearch={setMobilSearch} />}
      <AppRouter user={user} />

      <Footer theme={footerTheme} />
    </div>
  );
});

export default App;

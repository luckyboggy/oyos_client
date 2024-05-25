import { Admin } from "pages/Admin";
import { Basket } from "pages/Basket";
import { Shop } from "pages/Shop";
import { Product } from "pages/Product";
import { MainPage } from "pages/Main";
import { Auth } from "pages/Auth";
import { NoPage } from "pages/NoPage";
import { About } from "pages/About";
import { Favorites } from "pages/Favorites";
import { Delivery } from "pages/Delivery";
import { User } from "pages/User";
import { Ordering } from "pages/Ordering";
import { Workshops } from "pages/Workshops";
import { SearchPage } from "pages/Search";

import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DELIVERY_ROUTE,
  LOGIN_ROUTE,
  MAINPAGE_ROUTE,
  FAVORITES_ROUTE,
  USER_ROUTE,
  NOPAGE_ROUTE,
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
  SEARCH_ROUTE,
  SHOP_ROUTE,
  ORDERING_ROUTE,
  WORKSHOPS_ROUTE,
} from "app/utils/consts";

const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Element: Admin,
  },
  {
    path: USER_ROUTE,
    Element: User,
  },
];

const publicRoutes = [
  {
    path: MAINPAGE_ROUTE,
    Element: MainPage,
  },
  {
    path: SHOP_ROUTE,
    Element: Shop,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Element: Product,
  },
  {
    path: REGISTRATION_ROUTE,
    Element: Auth,
  },
  {
    path: LOGIN_ROUTE,
    Element: Auth,
  },
  {
    path: BASKET_ROUTE,
    Element: Basket,
  },
  {
    path: ABOUT_ROUTE,
    Element: About,
  },
  {
    path: DELIVERY_ROUTE,
    Element: Delivery,
  },
  {
    path: NOPAGE_ROUTE,
    Element: NoPage,
  },
  {
    path: FAVORITES_ROUTE,
    Element: Favorites,
  },
  {
    path: ORDERING_ROUTE,
    Element: Ordering,
  },
  {
    path: WORKSHOPS_ROUTE,
    Element: Workshops,
  },
  {
    path: SEARCH_ROUTE,
    Element: SearchPage,
  },
];

export { authRoutes, publicRoutes };

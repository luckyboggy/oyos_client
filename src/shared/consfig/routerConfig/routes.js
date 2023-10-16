import { Admin } from "pages/Admin/ui/Admin.jsx";
import { Basket } from "pages/Basket/ui/Basket.jsx";
import { Shop } from "pages/Shop/ui/Shop.jsx";
import { Product } from "pages/Product/ui/Product.jsx";
import { MainPage } from "pages/Main/ui/MainPage.jsx";
import { Auth } from "pages/Auth/ui/Auth.jsx";
import { NoPage } from "pages/NoPage/ui/NoPage.jsx";
import { About } from "pages/About/ui/About.jsx";
import { Favorites } from "pages/Favorites/ui/Favorites.jsx";
import { Delivery } from "pages/Delivery/ui/Delivery.jsx";
import { User } from "pages/User/ui/User.jsx";
import { Ordering } from "pages/Ordering/ui/Ordering.jsx";
import { Workshops } from "pages/Workshops/ui/Workshops.jsx";

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
];

export { authRoutes, publicRoutes };

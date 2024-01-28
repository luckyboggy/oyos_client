export const ADMIN_ROUTE = "admin";
export const BASKET_ROUTE = "basket";
export const ORDERING_ROUTE = "ordering";

export const SHOP_ROUTE = "shop";
export const PRODUCT_ROUTE = "product";

export const REGISTRATION_ROUTE = "registration";
export const LOGIN_ROUTE = "login";
export const MAINPAGE_ROUTE = "";
export const USER_ROUTE = "user";
export const FAVORITES_ROUTE = 'favorites';

export const ABOUT_ROUTE = "about";
export const WORKSHOPS_ROUTE = "workshops";
export const DELIVERY_ROUTE = "delivery";

export const NOPAGE_ROUTE = "*";

export const ORDER_STATUS = {
  issued: "оформлен",
  inProcess: "в обработке",
  delivery: "в доставке",
  delivered: "доставлен",
  received: "получен",
  canceled: "отменен",
};

export const SORT_TYPES = [
  { name: "Новинки", value: ["updatedAt", "DESC"] },
  { name: "Дешевле", value: ["price", "ASC"] },
  { name: "Дороже", value: ["price", "DESC"] },
];

export const MANAGEMENT = [
  { value: "products", name: "Товары" },
  { value: "types", name: "Категории" },
  { value: "collections", name: "Коллекции" },
  { value: "users", name: "Пользователи" },
  { value: "orders", name: "Заказы" },
  { value: "personal", name: "Личные данные" },
];



//CSS
//breakpoints
export const SCREEN = {
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400
}




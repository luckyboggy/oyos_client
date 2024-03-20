import {
  createOrder,
  setOrderNumber,
  fromBasketToOrder,
  fromLocalBasketToOrder,
} from "http/orderAPI";
import { user } from "index.js";

// Перенос из корзины в заказ (у авторизованного пользователя)
const handleFromBasketToOrder = async () => {
  await createOrder(user.user.id).then(() => {
    setOrderNumber(user.user.id).then(() => {
      if (user.isAuth) {
        fromBasketToOrder(user.user.id).then(() => {});
      }
    });
  });
};

// Создание пользователя и перенос содержимого корзины в заказ

const handleFromLocalBasketToOrder = async (personal) => {
  await fromLocalBasketToOrder(personal).then((data) => {
    window.localStorage.removeItem("localBasket");
  });
};

export { handleFromBasketToOrder, handleFromLocalBasketToOrder };

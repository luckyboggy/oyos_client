import { createOrder, setOrderNumber, fromBasketToOrder } from "http/orderAPI";
import { registration } from "http/userAPI";
import { fetchBasketProduct } from "http/basketProductAPI";
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

const handleFromBasketToOrderNotAuth = async () => {
  
};

export { handleFromBasketToOrder, handleFromBasketToOrderNotAuth };

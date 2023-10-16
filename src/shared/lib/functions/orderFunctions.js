import { createOrder, setOrderNumber, fromBasketToOrder } from "http/orderAPI";
import { fetchBasketProduct } from "http/basketProductAPI";
import { user } from "index.js";

const handleFromBasketToOrder = async () => {
  await createOrder(user.user.id).then(() => {
    setOrderNumber(user.user.id).then(() => {
      if (user.isAuth) {
        fromBasketToOrder(user.user.id).then(() => {
          fetchBasketProduct(user.basketId).then((data) => {
            user.setBasketCount(data.count);
            user.setBasketItems(data.rows);
          });
        })
      }
    })
  })


};

export { handleFromBasketToOrder };

import { user } from "index.js";
import {
  addToBasket,
  fetchBasketProduct,
  deleteFromBasket,
} from "http/basketProductAPI.js";
import { fetchOneProduct } from "http/productAPI.js";

const handleAddToBasket = async (
  id,
  selectedSize = "unified",
  quantity = 1
) => {
  if (user.isAuth) {
    addToBasket({
      basketId: user.basketId,
      productId: id,
      selectedSize: selectedSize,
      quantity: quantity,
    });
    await fetchBasketProduct(user.basketId).then((data) => {
      user.setBasketCount(data.count);
      user.setBasketItems(data.rows);
    });
  } else {
    user.addToLocalBasket(id, selectedSize);
    window.localStorage.setItem(
      "localBasket",
      JSON.stringify(user.localBasket)
    );
  }
};

const handleRemoveFromBasket = (productId, selectedSize) => {
  if (user.isAuth) {
    deleteFromBasket({ productId: productId, selectedSize: selectedSize }).then(
      () => {
        fetchBasketProduct(user.basketId).then((data) => {
          user.setBasketCount(data.count);
          user.setBasketItems(data.rows);
        });
      }
    );
  } else {
    user.removeFromLocalBasket(productId, selectedSize);
    window.localStorage.setItem(
      "localBasket",
      JSON.stringify(user.localBasket)
    );
  }
};

const isInBasket = (id, size) => {
  let foundProduct = null;

  if (user.isAuth) {
    foundProduct = user.basketItems.find(
      (item) => item.productId === id && item.selectedSize === size
    );
  } else {
    foundProduct = user.localBasket.find(
      (item) => item.productId === id && item.selectedSize === size
    );
  }

  if (foundProduct && foundProduct.selectedSize === "unified") {
    return true;
  } else if (foundProduct && foundProduct.selectedSize === size) {
    return true;
  }
  return false;
};

const basketTotalPrice = async () => {
  let total = 0;
  let productData = [];
  if (user.isAuth) {
    productData = await Promise.all(
      user.basketItems.map((item) => fetchOneProduct(item.productId))
    );
  } else {
    productData = await Promise.all(
      user.localBasket.map((item) => fetchOneProduct(item.productId))
    );
  }

  productData.forEach((data) => {
    total += Number(data.price);
  });

  return total;
};

export {
  handleAddToBasket,
  handleRemoveFromBasket,
  isInBasket,
  basketTotalPrice,
};

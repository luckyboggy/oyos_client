import { user } from "index.js";
import {
  addToFavorites,
  fetchFavoritesProduct,
  deleteFromFavorites,
} from "http/favoritesProductAPI.js";

const handleAddToFavorites = (id) => {
  if (!window.localStorage.getItem("alreadyliked")) {
    user.setToLogin(true);
  }
    window.localStorage.setItem("alreadyliked", true);

  if (user.isAuth) {
    addToFavorites({ favoriteId: user.favoriteId, productId: id });
    fetchFavoritesProduct(user.favoriteId).then((data) => {
      user.setFavoritesCount(data.count);
      user.setFavoritesItems(data.rows);
    });
  } else {
    user.addToLocalFavorites(id);
    window.localStorage.setItem(
      "localFavorites",
      JSON.stringify(user.localFavorites)
    );
  }
};

const handleRemoveFromFavorites = (productId) => {
  if (user.isAuth) {
    deleteFromFavorites(productId).then(() => {
      fetchFavoritesProduct(user.favoriteId).then((data) => {
        user.setFavoritesCount(data.count);
        user.setFavoritesItems(data.rows);
      });
    });
  } else {
    user.removeFromLocalFavorites(productId);
    window.localStorage.setItem(
      "localFavorites",
      JSON.stringify(user.localFavorites)
    );
  }
};

const isInFavorites = (id) => {
  let foundProduct = null;

  if (user.isAuth) {
    foundProduct = user.favoritesItems.find((item) => item.productId === id);
  } else {
    foundProduct = user.localFavorites.find((item) => item.productId === id);
  }

  if (foundProduct) {
    return true;
  }
  return false;
};

const toggleFavorite = async (event, id, favorite) => {
  event.stopPropagation();
  if (favorite) {
    await handleRemoveFromFavorites(id);
  } else {
    await handleAddToFavorites(id);
  }
};

export {
  handleAddToFavorites,
  handleRemoveFromFavorites,
  isInFavorites,
  toggleFavorite,
};

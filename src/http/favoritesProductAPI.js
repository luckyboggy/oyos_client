import { $authHost, $host } from "../shared/api/index.js";

const addToFavorites = async (favoritesProduct) => {

  const { data } = await $authHost.post("api/favoritesProduct", favoritesProduct);
  return data;
};

const fetchFavoritesProduct = async (favoriteId) => {

  const { data } = await $authHost.get("api/favoritesProduct", {
    params: {
      favoriteId,
    },
  });
  return data;
};
const deleteFromFavorites = async (productId) => {
  const { data } = await $authHost.delete(`api/favoritesProduct/${productId}`);
  //window.localStorage.setItem("jsonWebToken", data.jsonWebToken);
  //return data.jsonWebToken;
}

export { addToFavorites, fetchFavoritesProduct, deleteFromFavorites };

import { $authHost, $host } from "../shared/api/index.js";

const getFavorites = async (userId) => {
  const { data } = await $authHost.get("api/favorites", {
    params: { userId },
  });
  return data;
};

export { getFavorites };

import { $authHost, $host } from "../shared/api/index.js";

const getBasket = async (userId) => {
  const { data } = await $authHost.get("api/basket", {
    params: { userId },
  });
  return data;
};

export { getBasket };

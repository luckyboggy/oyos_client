import { $authHost, $host } from "../shared/api/index.js";

const createOrder = async (userId) => {
  const { data } = await $authHost.post("api/order", { userId });
  return data;
};

const setOrderNumber = async (userId) => {
  const { data } = await $authHost.post("api/order/setNumber", { userId });
  return data;
};

const changeOrderStatus = async (id, status) => {
  const { data } = await $authHost.post("api/order/changeStatus", {
    id, status
  });
  return data;
}

const getOrdersByUser = async (userId) => {
  const { data } = await $authHost.get(`api/order/${userId}`);
  return data;
};

const fetchOrdersByStatus = async (statuses) => {
  const { data } = await $authHost.get("api/order", {
    params: { statuses },
  });
  return data;
};

const fromBasketToOrder = async (userId) => {
  console.log('fbto')
  const { data } = await $authHost.post("api/order/basketToOrder", { userId });
  return data;
};

export {
  createOrder,
  setOrderNumber,
  getOrdersByUser,
  fromBasketToOrder,
  changeOrderStatus,
  fetchOrdersByStatus,
};

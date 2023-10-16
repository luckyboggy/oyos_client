import { $authHost, $host } from "../shared/api/index.js";

const fetchOrderProducts = async (orderId) => {
    const { data } = await $authHost.get("api/orderProduct", {
        params: {
            orderId,
        },
    });
    return data;
};

export { fetchOrderProducts }

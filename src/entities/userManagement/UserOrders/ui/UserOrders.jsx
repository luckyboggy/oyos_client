import React, { useEffect, useContext, useState } from "react";
import { Context } from "index.js";
import { getOrdersByUser } from "http/orderAPI";
import { OrderList } from "widgets/OrderList/OrderList/OrderList";
import cls from "./UserOrders.module.scss";

const UserOrders = () => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersByUser(user.user.id)
      .then((data) => {
        user.setOrderItems(data.rows);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <div className={cls.userOrders}>{!loading && <OrderList />}</div>;
};

export { UserOrders };

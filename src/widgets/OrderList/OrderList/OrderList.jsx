import React, { useContext } from "react";
import { Context } from "index.js";
import cls from "./OrderList.module.scss";
import { OrderItem } from "../OrderItem/OrderItem";

const OrderList = () => {
  const { user } = useContext(Context);
  console.log(user.orderItems);
  return (
    <div className={cls.orderList}>
      {user.orderItems.map((order) => (
        <OrderItem order={order} key={order.id} />
      ))}
    </div>
  );
};

export { OrderList };

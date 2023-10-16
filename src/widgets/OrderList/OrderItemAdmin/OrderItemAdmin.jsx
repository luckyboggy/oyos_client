import React, { useEffect, useState } from "react";
import { fetchOrderProducts } from "http/orderProductAPI";
import { OrderProduct } from "../OrderProduct/OrderProduct";
import { CustomSelect } from "shared/ui/select/CustomSelect.jsx";
import { ReactComponent as Arrow } from "shared/assets/img/svg/arrow.svg";
import { orderStatus } from "app/utils/consts.js";
import { fetchUser } from "http/userAPI";
import cls from "./OrderItemAdmin.module.scss";
import { changeOrderStatus } from "http/orderAPI";

const OrderItemAdmin = ({ order }) => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [user, setUser] = useState();
  const [showOrderProducts, setShowOrderProducts] = useState(false);

 

  const makeStatusList = () => {
    let statuses = [];
    Object.entries(orderStatus).map(([key, value]) => {
      if (key !== "canceled" && key !== order.status)
        statuses.push({ value: key, name: value });
    });
    return statuses;
  };

  const formattedDate = (d) => {
    const date = new Date(d);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${day.toString().padStart(2, 0)}.${month
      .toString()
      .padStart(2, 0)}.${year}`;
  };

  const changeStatus = (status) => {
    changeOrderStatus(order.id, status)
  }

  useEffect(() => {
    makeStatusList();
    fetchOrderProducts(order.id)
      .then((data) => {
        setOrderProducts(data.rows);
      })
      .then(() => {
        fetchUser(order.userId).then((data) => {
          setUser(data);
        });
      });
  }, []);

  return (
    <div className={cls.orderItemAdmin}>
      <div className={cls.orderInfo}>
        <div className={cls.title}>
          <div className={cls.number} >Заказ № {order.number}</div>
          <div className={cls.status}>
            <CustomSelect
              options={makeStatusList()}
              defValue={orderStatus[order.status]}
              onChange={changeStatus}
            />
          </div>
        </div>
        {user && (
          <div className={cls.userInfo}>
            <div className={cls.email}>{user.email}</div>
            <div className={cls.name}>
              {user.name} {user.surename}
            </div>
          </div>
        )}

        <div className={cls.orderDate}>
          <div>Дата оформления</div>
          <div>{formattedDate(order.createdAt)}</div>
        </div>
        <div className={cls.priceQuantity}>
          <div className={cls.quantity}>Товаров: {orderProducts.length}</div>
          <div className={cls.totalPrice}>{order.totalPrice} р</div>
        </div>
      </div>
      <hr />
      {showOrderProducts && (
        <div className={cls.orderProducts}>
          {orderProducts.map((orderProduct) => (
            <div key={orderProduct.productId + orderProduct.selectedSize}>
              <OrderProduct orderProduct={orderProduct} />
              <hr />
            </div>
          ))}
        </div>
      )}
      <div
        className={cls.showBtn}
        onClick={() => setShowOrderProducts(!showOrderProducts)}
      >
        <div>{showOrderProducts ? "Скрыть" : "Показать товары"}</div>
        <Arrow
          className={`${cls.dropArrow} ${showOrderProducts ? cls.active : ""}`}
        />
      </div>
    </div>
  );
};

export { OrderItemAdmin };

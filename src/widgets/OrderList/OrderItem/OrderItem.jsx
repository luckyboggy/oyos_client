import React, { useEffect, useState } from "react";
import { fetchOrderProducts } from "http/orderProductAPI";
import { OrderProduct } from "../OrderProduct/OrderProduct";
import { ReactComponent as Arrow } from "shared/assets/img/svg/arrow.svg";
import { Modal } from "shared/ui/modal/Modal";
import { ORDER_STATUS } from "app/utils/consts.js";
import { Portal } from "shared/ui/portal/Portal";
import cls from "./OrderItem.module.scss";
import { Text } from "shared/ui/text/Text";
import { CustomButton } from "shared/ui/button/CustomButton";

const OrderItem = ({ order }) => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [showOrderProducts, setShowOrderProducts] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const formattedDate = (d) => {
    const date = new Date(d);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day.toString().padStart(2, 0)}.${month
      .toString()
      .padStart(2, 0)}.${year}  ${hours.toString().padStart(2, 0)}:${minutes
      .toString()
      .padStart(2, 0)}`;
  };

  useEffect(() => {
    fetchOrderProducts(order.id).then((data) => {
      setOrderProducts(data.rows);
    });
  }, []);

  return (
    <div className={cls.orderItem}>
      {cancelModal && (
        <Portal>
          <Modal
            type={"central"}
            title={"Отмена заказа"}
            close={() => setCancelModal(false)}
          >
            {(order.status === "issued" || order.status === "inProcess") && (
              <div className={cls.cancelConfirm}>
                <Text size={"m"} padding="pv2">
                  Вы дествительно хотите отменить заказ № {order.number}
                </Text>
                <div className={cls.btns}>
                  <CustomButton theme="inverted" fontSize="m">
                    Да
                  </CustomButton>
                  <CustomButton
                    fontSize="m"
                    onClick={() => setCancelModal(false)}
                  >
                    Нет
                  </CustomButton>
                </div>
              </div>
            )}
            {(order.status === "delivery" ||
              order.status === "delivered" ||
              order.status === "received") && (
              <div className={cls.cancelConfirm}>
                <Text size={"m"} padding="pv2">
                  Заказ № {order.number} {ORDER_STATUS[order.status]}. Отмена на данном этапе невозможно.
                </Text>
                <div className={cls.btn}>

                  <CustomButton
                    fontSize="m"
                    onClick={() => setCancelModal(false)}
                  >
                    Ок
                  </CustomButton>
                </div>
              </div>
            )}
          </Modal>
        </Portal>
      )}
      <div className={cls.orderInfo}>
        <div className={cls.title}>
          <div className={cls.number}>Заказ № {order.number}</div>
        </div>
        <div className={cls.cancelBtn} onClick={() => setCancelModal(true)}>
          Отменить заказ
        </div>
        <div className={cls.statusBar}>
          <div>Статус заказа:</div>
          <div className={cls.status}>{ORDER_STATUS[order.status]}</div>
        </div>

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

export { OrderItem };

import React, { useEffect, useState } from "react";
import { fetchOrdersByStatus } from "http/orderAPI";
import { ORDER_STATUS } from "app/utils/consts.js";
import { ReactComponent as Sort } from "shared/assets/img/svg/sort.svg";
import { CheckBox } from "shared/ui/checkbox/CheckBox";
import { Modal } from "shared/ui/modal/Modal";
import { CustomButton } from "shared/ui/button/CustomButton";
import cls from "./OrderManagement.module.scss";
import { OrderItemAdmin } from "widgets/OrderList/OrderItemAdmin/OrderItemAdmin";

const OrderManagement = () => {
  const [filters, setFilters] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [orders, setOrders] = useState([]);

  const toggleStatus = (i, value) => {
    if (selectedStatuses[i] === value) {
      let newStatuses = [...selectedStatuses];
      newStatuses[i] = undefined;
      setSelectedStatuses(newStatuses);
    } else {
      let newStatuses = [...selectedStatuses];
      newStatuses[i] = value;
      setSelectedStatuses(newStatuses);
    }
  };

  useEffect(() => {
    fetchOrdersByStatus(null).then((data) => {
      setOrders(data.rows);
    });
  }, []);

  useEffect(() => {
    fetchOrdersByStatus(selectedStatuses).then((data) => setOrders(data.rows));
  }, [selectedStatuses]);

  return (
    <div className={cls.orders}>
      {/* Модальное окно с фильтрами */}
      {filters && (
        <Modal type={"lower"} title={"Статус заказа"} close={setFilters}>
          <div className={cls.filters}>
            <div className={cls.statusSelector}>
              {Object.entries(ORDER_STATUS).map(([key, value], index) => (
                <CheckBox
                  key={key}
                  type={"checkbox"}
                  checked={selectedStatuses.includes(key)}
                  onChange={() => {
                    toggleStatus(index, key);
                  }}
                >
                  {value}
                </CheckBox>
              ))}
            </div>
            <hr />
            <div className={cls.accceptBtn}>
              <CustomButton
                fontSize={"m"}
                onClick={() => {
                  setFilters(false);
                }}
              >
                Применить
              </CustomButton>
            </div>
          </div>
        </Modal>
      )}
      {/* toolbar */}
      <div className={cls.toolbar}>
        <div className={cls.search}></div>
        <div
          className={cls.filter}
          onClick={() => {
            setFilters(!filters);
          }}
        >
          <div className={cls.filterTitle}>
            <div className={cls.filterName}>Статус заказа</div>
            <Sort className={cls.filterIcon} />
          </div>
        </div>
      </div>
      <div className={cls.orderList}>
        {orders.map((order) => (
          <OrderItemAdmin order={order} key={order.id} />
        ))}
      </div>
    </div>
  );
};

export { OrderManagement };

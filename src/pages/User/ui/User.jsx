import React, { useState } from "react";
import { Select } from "shared/ui/select2/Select";
import { IsMobil } from "shared/lib/hooks/IsMobil.js";
import { UserPersonal } from "entities/userManagement/UserPersonal";
import { UserOrders } from "entities/userManagement/UserOrders/ui/UserOrders";
import { observer } from "mobx-react-lite";
import cls from "./User.module.scss";

const User = observer(() => {
  const isMobile = IsMobil();

  const management = [
    { value: "personal", name: "Личные данные" },
    { value: "orders", name: "Заказы" },
    { value: "favorites", name: "Избранное" },
  ];
  const [currentManagement, setCurrentManagement] = useState("personal");

  return (
    <div className={cls.user}>
      <div className={cls.menu}>
        {isMobile && (
          <Select
            selected={currentManagement}
            setSelected={setCurrentManagement}
            options={management}
          />
        )}
      </div>
      {currentManagement === "personal" && <UserPersonal />}
      {currentManagement === "orders" && <UserOrders />}
    </div>
  );
});

export { User };

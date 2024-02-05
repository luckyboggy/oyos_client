import React, { useState } from "react";
import { Select } from "shared/ui/select2/Select";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { UserPersonal } from "entities/userManagement/UserPersonal";
import { UserOrders } from "entities/userManagement/UserOrders/ui/UserOrders";
import { SideBar } from "widgets/SideBar/ui/SideBar";
import { observer } from "mobx-react-lite";
import { USER_MANAGEMENT } from "app/utils/consts";
import cls from "./User.module.scss";

const User = observer(() => {
  const [currentManagement, setCurrentManagement] = useState("personal");

  return (
    <div className={cls.user}>
      <div className={cls.menu}>
        {!useScreenSize().isSm ? (
          <Select
            selected={currentManagement}
            setSelected={setCurrentManagement}
            options={USER_MANAGEMENT}
          />
        ) : (
          <SideBar
            selected={currentManagement}
            setSelected={setCurrentManagement}
            options={USER_MANAGEMENT}
          />
        )}
      </div>
      <div className={cls.content}>
        {currentManagement === "personal" && <UserPersonal />}
        {currentManagement === "orders" && <UserOrders />}
      </div>
    </div>
  );
});

export { User };

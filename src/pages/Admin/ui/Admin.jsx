import React, { useState } from "react";
import { Select } from "shared/ui/select2/Select";
import { useScreenSize } from "shared/lib/hooks/useScreenSize";
import { CategoryManagement } from "entities/adminManagements/CategoryManagement";
import { CollectionManagement } from "entities/adminManagements/CollectionsManagement";
import { UserManagement } from "entities/adminManagements/UserManagement/";
import { OrderManagement } from "entities/adminManagements/OrderManagement";
import { PersonalManagement } from "entities/adminManagements/PersonalManagement";
import { ProductManagement } from "entities/adminManagements/ProductManagement";
import { observer } from "mobx-react-lite";
import cls from "./Admin.module.scss";

const Admin = observer(() => {
  const management = [
    { value: "products", name: "Товары" },
    { value: "types", name: "Категории" },
    { value: "collections", name: "Коллекции" },
    { value: "users", name: "Пользователи" },
    { value: "orders", name: "Заказы" },
    { value: "personal", name: "Личные данные" },
  ];

  const [currentManagement, setCurrentManagement] = useState("products");

  return (
    <div className={cls.admin}>
      <div className={cls.menu}>
        {!useScreenSize().isSm && (
          <Select
            selected={currentManagement}
            setSelected={setCurrentManagement}
            options={management}
          />
        )}
      </div>
      <div className={cls.content}>
        {currentManagement === "products" && <ProductManagement />}
        {currentManagement === "types" && <CategoryManagement />}
        {currentManagement === "collections" && <CollectionManagement />}
        {currentManagement === "users" && <UserManagement />}
        {currentManagement === "orders" && <OrderManagement />}
        {currentManagement === "personal" && <PersonalManagement />}
      </div>
    </div>
  );
});

export { Admin };

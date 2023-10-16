import React, { useContext } from "react";
import { Context } from "index.js";
import CustomAccordion from "shared/ui/accordion/CustomAccordion.jsx";

const ProductFilter = () => {
  const { product } = useContext(Context);
  return (
    <div>
      <CustomAccordion title={"Типы"} items={product.types} />
    </div>
  );
};

export { ProductFilter };

import React, { useContext } from "react";
import { Context } from "index.js";
import { observer } from "mobx-react-lite";
import cls from "./Pagination.module.scss";

const Pagination = observer(() => {
  const { product } = useContext(Context);
  const pages = [];

  for (let i = 0; i < product.pageCount; i++) {
    pages.push(i + 1);
  }

  console.log(product.pageCount);

  return (
    <div className={cls.pagination}>
      {pages.map((page) => (
        <div
          className={cls.pageItem}
          key={page}
          onClick={() => product.setPage(page)}
        >
          {page}
        </div>
      ))}
    </div>
  );
});

export { Pagination };

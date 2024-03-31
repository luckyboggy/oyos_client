import { useMemo } from "react";

export const useSeachedTypes = (types, query) => {
  const searchedTypes = useMemo(() => {
    return types.filter((type) => type.name.toLowerCase().includes(query));
  }, [query, types]);
  return searchedTypes;
};

export const useSearchedProducts = (products, query) => {
  const searchedProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [query, products]);
  return searchedProducts;
};

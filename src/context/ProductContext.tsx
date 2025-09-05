/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, type ReactNode } from "react";
import type { IProduct } from "../types/product.type";
import { getProducts } from "../api/product.api";

export type ProductContextType = {
  products: IProduct[];
  // lowStockAlerts: IProduct[];
  fetchProducts: () => Promise<void>;
  isProductLoading: boolean;
};

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(false);
  // const [lowStockAlerts, setLowStockAlerts] = useState<IProduct[]>([]);

  // const STOCK_THRESHOLD = 5;

  // useEffect(() => {
  //   const alerts = products.filter((p) => p.quantity <= STOCK_THRESHOLD);
  //   setLowStockAlerts(alerts);
  // }, [products]);

  const fetchProducts = async () => {
    setIsProductLoading(true);
    try {
      const products = await getProducts();
      if (products) {
        setProducts(products);
      }
    } catch (error) {
      console.log("error : ", error);
    }
    setIsProductLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        // lowStockAlerts,
        fetchProducts,
        isProductLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

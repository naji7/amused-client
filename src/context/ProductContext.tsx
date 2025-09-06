/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, type ReactNode } from "react";
import type { IProduct } from "../types/product.type";
import { getProducts } from "../api/product.api";
import { EVENT_URL } from "../constant/app";
import type { IAlert } from "../types/alert.type";
import { toast } from "react-toastify";

export type ProductContextType = {
  products: IProduct[];
  fetchProducts: () => Promise<void>;
  isProductLoading: boolean;
  lowStockAlerts: IAlert[];
};

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(false);
  const [lowStockAlerts, setLowStockAlerts] = useState<IAlert[]>([]);

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

  useEffect(() => {
    const eventSource = new EventSource(EVENT_URL);

    eventSource.addEventListener("lowStock", (event) => {
      const alerts = JSON.parse(event.data);
      console.log("Low stock alert:", alerts);
      setLowStockAlerts((prev) => [...prev, alerts]);
    });

    eventSource.onerror = (err) => {
      console.log("eerr : ", err);
      toast.error("Connection lost!");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        lowStockAlerts,
        fetchProducts,
        isProductLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

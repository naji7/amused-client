import axios from "axios";

import type { ICreateProduct, IUpdateProduct } from "../types/product.type";
import { BASE_URL } from "../constant/app";

export const createProduct = async (data: ICreateProduct) => {
  try {
    const res = await axios.post(`${BASE_URL}/products`, data);
    return res.data;
  } catch (error) {
    console.log("error : ", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    return res.data;
  } catch (error) {
    console.log("error : ", error);
    throw error;
  }
};

export const updateProduct = async (id: string, data: IUpdateProduct) => {
  try {
    const res = await axios.put(`${BASE_URL}/products/${id}`, data);
    return res.data;
  } catch (error) {
    console.log("error : ", error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/products/${id}`);
    return res;
  } catch (error) {
    console.log("error : ", error);
    throw error;
  }
};

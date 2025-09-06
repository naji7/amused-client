import axios from "axios";

import { BASE_URL } from "../constant/app";
import type { IUpdateProduct } from "../types/product.type";

export const createProduct = async (formData: FormData) => {
  try {
    const res = await axios.post(`${BASE_URL}/products`, formData);
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

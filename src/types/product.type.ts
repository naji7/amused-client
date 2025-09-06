export type Category = "ELECTRONICS" | "FASHION" | "HOME" | "BOOKS" | "TOYS";

export interface IProduct {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

export interface ICreateProduct {
  sellerId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
  imageUrl: string;
}

export interface IUpdateProduct {
  sellerId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
}

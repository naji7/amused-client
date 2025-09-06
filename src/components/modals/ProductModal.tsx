"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IProduct } from "../../types/product.type";
import {
  productSchema,
  type ProductFormValues,
} from "../../schema/product.schema";
import { CATEGORIES } from "../../constant/app";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product?: IProduct | null;
  onSubmit: (data: ProductFormValues) => void;
  isLoading: boolean;
};

const ProductModal = ({
  isOpen,
  onClose,
  product,
  onSubmit,
  isLoading,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product ?? {
      sellerId: "seller123",
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      category: "ELECTRONICS",
    },
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    product?.imageUrl || null
  );

  useEffect(() => {
    if (product) {
      reset({
        sellerId: product.sellerId,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
      });
      setPreviewUrl(product.imageUrl || null);
      setSelectedImage(null);
    } else {
      reset({
        sellerId: "seller123",
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category: "ELECTRONICS",
      });
      setPreviewUrl(null);
      setSelectedImage(null);
    }
  }, [product, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const submitHandler = (data: ProductFormValues) => {
    onSubmit({ ...data, image: selectedImage || undefined });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Product Modal"
      className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 w-full max-w-md mx-4 outline-none"
      overlayClassName="fixed inset-0 bg-gray-500/20 backdrop-blur-[2px] flex justify-center items-center z-50"
    >
      <h2 className="text-lg font-medium mb-6">
        {product ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 mb-1">Name</label>
          <input
            className="w-full p-2 border border-gray-200 rounded text-sm"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-xs mt-1 ">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1">Description</label>
          <input
            className="w-full p-2 border border-gray-200 rounded text-sm"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500 text-xs mt-1 ">
              {errors.description.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-2 border border-gray-200 rounded text-sm"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-red-500 text-xs mt-1 ">
              {errors.price.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1">Quantity</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-200 rounded text-sm"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <span className="text-red-500 text-xs mt-1 ">
              {errors.quantity.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1">Image</label>
          {!product && (
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-200 rounded text-sm"
            />
          )}

          {previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              className="mt-2 h-24 w-24 object-cover rounded border"
            />
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1">Category</label>
          <select
            className="w-full p-2 border border-gray-200 rounded text-sm"
            {...register("category")}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-xs mt-1 ">
              {errors.category.message}
            </span>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2 text-sm border border-gray-200 rounded hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            {product
              ? isLoading
                ? "Updating..."
                : "Update"
              : isLoading
              ? "Creating..."
              : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;

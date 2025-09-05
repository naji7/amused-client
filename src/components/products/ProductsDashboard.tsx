import { useState } from "react";
import { toast } from "react-toastify";

import ProductModal from "../modals/ProductModal";
import { useProducts } from "../../hooks/useProducts";
import type { IProduct } from "../../types/product.type";
import Table, { type Column } from "../common/Table";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/product.api";
import DeleteModal from "../modals/DeleteModal";
import type { ProductFormValues } from "../../schema/product.schema";

const ProductsDashboard = () => {
  const { fetchProducts, products, isProductLoading } = useProducts();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openCreateModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product: IProduct) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = async (data: ProductFormValues) => {
    setIsLoading(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        toast.success("Product updated successfully!");
      } else {
        const res = await createProduct(data);
        if (res) {
          await fetchProducts();
          toast.success("Product created successfully!");
        }
      }
      await fetchProducts();
      setModalOpen(false);
    } catch (err) {
      console.log("error in submit : ", err);
      toast.error(`Something went wrong!`);
    }
    setIsLoading(false);
  };

  const openDeleteModal = (product: IProduct) => {
    setDeletingProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProduct) {
      toast.error("Please select a product to delete");
      return;
    }

    setDeleteLoading(true);
    try {
      const res = await deleteProduct(deletingProduct.id);
      console.log("res : ", res);
      if (res) {
        await fetchProducts();
        toast.success("Product deleted successfully!");
        setDeleteModalOpen(false);
      }
    } catch (err) {
      toast.error(`Failed to delete product: ${err}`);
    }
    setDeleteLoading(false);
  };

  const columns: Column<IProduct>[] = [
    { key: "name", header: "Name" },
    { key: "price", header: "Price", render: (p) => `$${p.price}` },
    { key: "quantity", header: "Quantity" },
    {
      key: "category",
      header: "Category",
      render: (c) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {c.category}
        </span>
      ),
    },
    {
      key: undefined,
      header: "Actions",
      render: (a) => (
        <div className="flex space-x-2">
          <button
            onClick={() => openEditModal(a)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded text-sm cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => openDeleteModal(a)}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded text-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 mt-4">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg duration-200 cursor-pointer"
          >
            Add Product
          </button>
        </div>

        {isProductLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-500 mb-4">Loading...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-500 mb-4">No products found</p>
          </div>
        ) : (
          <Table data={products} columns={columns} />
        )}
      </div>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={editingProduct}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteLoading}
      />
    </div>
  );
};

export default ProductsDashboard;

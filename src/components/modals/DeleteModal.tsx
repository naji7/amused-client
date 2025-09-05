"use client";

import Modal from "react-modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

const DeleteModal = ({ isOpen, onClose, onConfirm, isLoading }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation"
      className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 w-full max-w-md mx-4 outline-none"
      overlayClassName="fixed inset-0 bg-gray-500/20 backdrop-blur-[2px] flex justify-center items-center z-50"
    >
      <h2 className="text-lg font-medium mb-4 text-red-600">Confirm Delete</h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this product?
      </p>

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
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;

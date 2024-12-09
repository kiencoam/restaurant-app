import { useState } from "react";

type DeleteConfirmationModalProps = {
  type: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export const DeleteModal = ({ type, isOpen, onClose, onDelete }: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] md:w-[50%] h-auto">
        <div className="text-xl font-bold mb-8">{`Xóa ${type}`}</div>
        <div className="mb-4 text-sm">
          {`Bạn có chắc chắn muốn xóa những ${type} đã chọn không?`}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xóa
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

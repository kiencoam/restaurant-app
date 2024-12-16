import React from "react";
import { CreateStockHistoryItemRequestv2 } from "./OpenPage";

interface ProductTableProps {
  tableData: CreateStockHistoryItemRequestv2[];
  handleQuantityChange: (productId: number, newQuantity: number) => void;
  handlePriceForUnitChange: (productId: number, newPrice: number) => void;
  handleRemoveProduct: (productId: number) => void;
  calculateTotal: (pricePerUnit: number, quantity: number) => number;
}

const ProductTable = ({
  tableData,
  handleQuantityChange,
  handlePriceForUnitChange,
  handleRemoveProduct,
  calculateTotal,
}: ProductTableProps) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border-collapse border rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
          <tr className="flex">
            <th className="px-2 py-3 text-center border flex-[0.5]">STT</th>
            <th className="px-2 py-3 text-left border flex-[1]">Mã hàng hóa</th>
            <th className="px-2 py-3 text-left border flex-[2]">Tên hàng</th>
            <th className="px-2 py-3 text-center border flex-[1]">Số lượng</th>
            <th className="px-2 py-3 text-center border flex-[1]">Đơn giá</th>
            <th className="px-2 py-3 text-center border flex-[1]">
              Thành tiền
            </th>
            <th className="px-2 py-3 text-center border flex-[0.5]">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-800 text-sm">
          {tableData.map((item, index) => (
            <tr
              key={item.productId}
              className="flex border-b hover:bg-gray-50 transition"
            >
              <td className="px-2 py-3 text-center flex-[0.5]">{index + 1}</td>
              <td className="px-2 py-3 text-left flex-[1]">
                {item.product.code}
              </td>
              <td className="px-2 py-3 text-left flex-[2]">
                {item.product.name}
              </td>
              <td className="px-2 py-3 text-center flex-[1]">
                <input
                  min="0"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.productId,
                      parseInt(e.target.value, 10) || 0
                    )
                  }
                  className="w-full text-right p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </td>
              <td className="px-2 py-3 text-center flex-[1]">
                <input
                  min="0"
                  type="number"
                  value={item.pricePerUnit}
                  onChange={(e) =>
                    handlePriceForUnitChange(
                      item.productId,
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full text-right p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </td>
              <td className="px-2 py-3 text-right flex-[1] font-semibold">
                {calculateTotal(
                  item.pricePerUnit,
                  item.quantity
                ).toLocaleString("en-US")}
                đ
              </td>
              <td className="px-2 py-3 text-center flex-[0.5] relative">
                <button
                  onClick={() => handleRemoveProduct(item.productId)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition shadow-md"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

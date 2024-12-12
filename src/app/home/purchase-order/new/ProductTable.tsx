import React from "react";
import { CreateStockHistoryItemRequestv2 } from "./NewStockHistory";

interface ProductTableProps {
  tableData: CreateStockHistoryItemRequestv2[];
  handleQuantityChange: (productId: number, newQuantity: number) => void;
  handlePriceForUnitChange: (productId: number, newPrice: number) => void;
  calculateTotal: (pricePerUnit: number, quantity: number) => number;
}

const ProductTable = ({
  tableData,
  handleQuantityChange,
  handlePriceForUnitChange,
  calculateTotal,
}: ProductTableProps) => {
  return (
    <table className="min-w-full border mt-6">
      <thead className="bg-[#f7fafc] text-[13px]">
        <tr>
          <th className="px-4 py-2 text-left">STT</th>
          <th className="px-4 py-2 text-left w-[110px]">Mã hàng hóa</th>
          <th className="px-4 py-2 text-left">Tên hàng</th>
          <th className="px-4 py-2 text-right w-[98px]">Số lượng</th>
          <th className="px-4 py-2 text-right w-[120px]">Đơn giá</th>
          <th className="px-4 py-2 text-right w-[120px]">Thành tiền</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {tableData.map((item, index) => (
          <tr key={item.productId} className="border-b">
            <td className="px-4 py-2 text-center">{index + 1}</td>
            <td className="px-4 py-2 text-center">{item.product.code}</td>
            <td className="px-4 py-2">{item.product.name}</td>
            <td className="px-4 py-2 text-center">
              <input
                min="0"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.productId, parseInt(e.target.value, 10) || 0)
                }
                className="w-full text-right p-1 border-b-2 outline-none focus:border-b-black"
              />
            </td>
            <td className="px-4 py-2 text-right">
              <input
                min="0"
                value={item.pricePerUnit}
                onChange={(e) =>
                  handlePriceForUnitChange(item.productId, parseFloat(e.target.value) || 0)
                }
                className="w-full text-right p-1 border-b-2 outline-none focus:border-b-black"
              />
            </td>
            <td className="px-4 py-2 text-right">
              {calculateTotal(item.pricePerUnit, item.quantity).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
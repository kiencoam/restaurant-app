// Check Enum CANCELED hoặc gì đó vì k tồn tại
// Chỉnh update từng item và cả đơn nhập

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getDetailStockHistory, StockHistoryEntity, UpdateStockHistoryRequest, UpdateStockHistoryItemRequest } from "@/app/api-client/StockHistoryService";
import { formatToDDMMYYYY } from "@/utils/timeUtils";

// export type UpdateStockHistoryRequest = {
//   supplierId: number;
//   userId: number;
//   code: string;
//   status: string;
//   note: string;
//   stockHistoryItems: UpdateStockHistoryItemRequest[];
// }

// export type UpdateStockHistoryItemRequest = {
//   productId: number;
//   quantity: number;
//   pricePerUnit: number;
// }

interface PurchaseOrderTableProps {
  data: StockHistoryEntity[];
  expandedRows: number;
  setExpandedRows: (id: number) => void;
}

const PurchaseOrderTable = ({ data, expandedRows, setExpandedRows }: PurchaseOrderTableProps) => {

  const [updatingStockHistory, setUpdatingStockHistory] = useState<StockHistoryEntity | null>(null)
  const [updatingStockHistoryId, setUpdatingStockHistoryId] = useState<number | null>(null)


  const handleRowClick = (id: number) => {
    setUpdatingStockHistoryId((prevId) => (prevId === id ? null : id));
  };


  useEffect(() => {
    if (updatingStockHistoryId !== null) {
      getDetailStockHistory(updatingStockHistoryId)
        .then((data) => {
          setUpdatingStockHistory(data);
          console.log(data)
        })
        .catch((error) => {
          console.error("Lỗi khi lấy chi tiết phiếu nhập:", error);
          setUpdatingStockHistory(null);
        });
    } else {
      setUpdatingStockHistory(null); // Reset khi ID là null (collapse)
    }
  }, [updatingStockHistoryId]);

  // useEffect(() => {
  //   const query = Object.entries(getProductRequest)
  //     .map(([key, value]) => {
  //       if (value || key === "page") {
  //         return `${key}=${value}`;
  //       }
  //     })
  //     .join("&");

  //   getAllProducts(query).then((data) => {
  //     setProducts(data.second);
  //   })
  // }, [getProductRequest]);


  return (
    <div className="m-[24px] border border-gray-300 rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#f7fafc] text-left">
            <th className="p-3 border w-[140px]">Mã nhập hàng</th>
            <th className="p-3 border w-[145px]">Thời gian</th>
            <th className="p-3 border w-[401px]">Nhà cung cấp</th>
            <th className="p-3 border w-[130px]">Cần trả NCC</th>
            <th className="p-3 border w-[160px]">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <tr
                onClick={() => {
                  handleRowClick(item.id); // Expand or collapse row
                }}
                className="hover:bg-gray-100 bg-white cursor-pointer"
              >
                <td className="p-3 border ">{item.code}</td>
                <td className="p-3 border ">{formatToDDMMYYYY(item.dateTime)}</td>
                <td className="p-3 border">{item.supplier.name}</td>
                <td className="p-3 border ">{item.totalPrice}</td>
                <td className="p-3 border ">{item.status}</td>
              </tr>
              {updatingStockHistoryId === item.id && updatingStockHistory && (
                <tr className="bg-gray-50">
                  <td colSpan={5} className="p-3 border">
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p>
                            <strong>Mã phiếu nhập:</strong> {updatingStockHistory.code}
                          </p>
                          <p>
                            <strong>Thời gian:</strong> {formatToDDMMYYYY(updatingStockHistory.dateTime)}
                          </p>
                          <p>
                            <strong>Nhà cung cấp:</strong> {updatingStockHistory.supplier.name}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Trạng thái:</strong> {updatingStockHistory.status}
                          </p>

                          <p>
                            <strong>Người nhập:</strong> {updatingStockHistory.user.name}
                          </p>
                          <p>
                            <strong>Ghi chú:</strong> {updatingStockHistory.note || ""}
                          </p>
                        </div>
                      </div>
                      <table className="w-full mt-2 border-collapse">
                        <thead>
                          <tr className="bg-[#f7fafc] text-left">
                            <th className="p-2 border w-[140px]">
                              Mã hàng hóa
                            </th>
                            <th className="p-2 border">Tên hàng</th>
                            <th className="p-2 border">Số lượng</th>
                            <th className="p-2 border">Đơn giá</th>
                            <th className="p-2 border">Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {updatingStockHistory.stockHistoryItems.map((product, index) => (
                            <tr key={index} className="bg-white">
                              <td className="p-2 border">{product.product.code}</td>
                              <td className="p-2 border">{product.product.name}</td>
                              <td className="p-2 border ">
                                {product.quantity}
                              </td>
                              <td className="p-2 border ">
                                {product.pricePerUnit}
                              </td>

                              <td className="p-2 border ">
                                {product.pricePerUnit * product.quantity}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-4 text-right">
                        <p>
                          <strong>Tổng số lượng:</strong>{" "}
                          {updatingStockHistory.stockHistoryItems.reduce((sum, item) => sum + item.quantity, 0)}
                        </p>
                        <p>
                          <strong>Tổng số mặt hàng:</strong>{" "}
                          {updatingStockHistory.stockHistoryItems.length}
                        </p>
                        <p>
                          <strong>Tổng tiền hàng:</strong>{" "}
                          {updatingStockHistory.stockHistoryItems.reduce(
                            (sum, item) => sum + item.quantity * item.pricePerUnit, 0)}
                        </p>
                        <p>
                          <strong>Tổng cộng:</strong> {" "} {updatingStockHistory.stockHistoryItems.reduce(
                            (sum, item) => sum + item.quantity * item.pricePerUnit, 0)}
                        </p>
                        <p>
                          <strong>Tiền đã trả NCC:</strong>{" "}
                          {updatingStockHistory.stockHistoryItems.reduce(
                            (sum, item) => sum + item.quantity * item.pricePerUnit, 0)}
                        </p>
                      </div>
                      <div className="flex justify-end gap-4 mt-4">
                        {/* CANCELED? */}
                        {updatingStockHistory.status !== "canceled" && (
                          <>
                            <button
                              onClick={() => handleRowClick(updatingStockHistory.id)}
                              className="border rounded-md px-2 shadow-sm bg-black text-white"
                            >
                              Lưu
                            </button>
                            {updatingStockHistory.status === "PENDING" && (
                              // <Link href={`/home/purchase-order/${updatingStockHistory.code}`}>
                              <Link href={`/home/purchase-order/open`}>

                                <button className="border rounded-md px-2 shadow-sm bg-blue-500 text-white">
                                  Mở phiếu
                                </button>
                              </Link>
                            )}
                            {updatingStockHistory.status === "DONE" && (
                              <Link href="/home/purchase-return">
                                <button className="border rounded-md px-2 shadow-sm bg-red-500 text-white">
                                  Trả hàng
                                </button>
                              </Link>
                            )}
                          </>
                        )}
                        <button
                          onClick={() => handleRowClick(updatingStockHistory.id)}
                          className="border rounded-md px-2 shadow-sm"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
};
export default PurchaseOrderTable;

import React from "react";
import Link from "next/link";
import { StockHistoryEntity } from "@/app/api-client/StockHistoryService";

interface PurchaseOrderTableProps {
  data: StockHistoryEntity[];
  expandedRows: string;
  handleRowClick: (id: number) => void;
}

const PurchaseOrderTable = ({ data, expandedRows, handleRowClick }: PurchaseOrderTableProps) => (

  <div className="mt-[1px] m-[24px] border border-gray-300 rounded-lg overflow-hidden">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-blue-100 text-left">
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
              onClick={() => handleRowClick(item.id)}
              className="hover:bg-gray-100 cursor-pointer"
            >
              <td className="p-3 border ">{item.code}</td>
              <td className="p-3 border ">{item.dateTime}</td>
              <td className="p-3 border">{item.supplier.name}</td>
              <td className="p-3 border ">{item.totalPrice}</td>
              <td className="p-3 border ">{item.status}</td>
            </tr>
            {expandedRows === item.code && (
              <tr className="bg-gray-50">
                <td colSpan={5} className="p-3 border">
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p>
                          <strong>Mã phiếu nhập:</strong> {item.code}
                        </p>
                        <p>
                          <strong>Thời gian:</strong> {item.dateTime}
                        </p>
                        <p>
                          <strong>Nhà cung cấp:</strong> {item.supplier.name}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Trạng thái:</strong> {item.status}
                        </p>
                        <p>
                          <strong>Người nhập:</strong> {item.user.name}
                        </p>
                        <p>
                          <strong>Ghi chú:</strong> {item.note || ""}
                        </p>
                      </div>
                    </div>
                    <table className="w-full mt-2 border-collapse">
                      <thead>
                        <tr className="bg-blue-100 text-left">
                          <th className="p-2 border w-[140px]">Mã hàng hóa</th>
                          <th className="p-2 border">Tên hàng</th>
                          <th className="p-2 border">Số lượng</th>
                          <th className="p-2 border">Đơn giá</th>
                          <th className="p-2 border">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.stockHistoryItems.map((product, index) => (
                          <tr key={index}>
                            <td className="p-2 border">{product.product.code}</td>
                            <td className="p-2 border">{product.product.name}</td>
                            <td className="p-2 border ">{product.quantity}</td>
                            <td className="p-2 border ">{product.pricePerUnit}</td>
                            <td className="p-2 border ">{product.quantity * product.pricePerUnit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-4 text-right">
                      <p>
                        <strong>Tổng số lượng:</strong>{" "}
                        {item.stockHistoryItems.reduce((sum, item) => sum + item.quantity, 0)}
                      </p>
                      <p>
                        <strong>Tổng số mặt hàng:</strong>{" "}
                        {item.stockHistoryItems.length}
                      </p>
                      <p>
                        <strong>Tổng tiền hàng:</strong>{" "}
                        {item.stockHistoryItems.reduce(
                          (sum, item) => sum + item.quantity * item.pricePerUnit, 0)}
                      </p>
                      <p>
                        <strong>Tổng cộng:</strong> {" "} {item.stockHistoryItems.reduce(
                          (sum, item) => sum + item.quantity * item.pricePerUnit, 0)}
                      </p>
                      <p>
                        <strong>Tiền đã trả NCC:</strong>{" "}
                        {item.stockHistoryItems.reduce(
                          (sum, item) => sum + item.quantity * item.pricePerUnit, 0)}
                      </p>
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                      {item.status !== "Đã hủy" && (
                        <>
                          <button
                            onClick={() => handleRowClick(item.id)}
                            className="border rounded-md px-2 shadow-sm bg-black text-white"
                          >
                            Lưu
                          </button>
                          {item.status === "Phiếu tạm" && (
                            <Link href={`/home/purchase-order/${item.code}`}>
                              <button className="border rounded-md px-2 shadow-sm bg-blue-500 text-white">
                                Mở phiếu
                              </button>
                            </Link>
                          )}
                          {item.status === "Đã nhập hàng" && (
                            <Link href="/home/purchase-order/return">
                              <button className="border rounded-md px-2 shadow-sm bg-red-500 text-white">
                                Trả hàng
                              </button>
                            </Link>
                          )}
                        </>
                      )}
                      <button
                        onClick={() => handleRowClick(item.id)}
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
);

export default PurchaseOrderTable;

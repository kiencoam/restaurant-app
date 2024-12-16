//update xong bi them 1 truong rong ?
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  getDetailStockHistory,
  StockHistoryEntity,
  UpdateStockHistoryRequest,
  UpdateStockHistoryItemRequest,
  updateStockHistory,
  deleteStockHistory,
} from "@/app/api-client/StockHistoryService";
import { formatToDDMMYYYY } from "@/utils/timeUtils";
import { loginUserContext } from "@/components/LoginUserProvider";
import { getAllUsers, UserEntity } from "@/app/api-client/UserService";
import { StockHistoryRequest } from "./page";

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
  setFilter: React.Dispatch<React.SetStateAction<StockHistoryRequest>>;
}

const PurchaseOrderTable = ({ data, setFilter }: PurchaseOrderTableProps) => {
  const [updatingStockHistory, setUpdatingStockHistory] =
    useState<StockHistoryEntity | null>(null);
  const [updatingStockHistoryId, setUpdatingStockHistoryId] = useState<
    number | null
  >(null);
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userName, setUserName] = useState("");

  //lấy id làm userid
  const id = Number(useContext(loginUserContext).id);

  useEffect(() => {
    if (userName) {
      const query = `page=0&page_size=5&name=${userName}`;

      getAllUsers(query).then((data) => {
        setUsers(data.second);
      });
    }
  }, [userName]);

  const handleRowClick = (id: number) => {
    setUpdatingStockHistoryId((prevId) => (prevId === id ? null : id));
  };

  const handleInputChange = (field: string, value) => {
    if (field === "userName") {
      setUserName(value); // Cập nhật giá trị state
    } else
      setUpdatingStockHistory({
        ...updatingStockHistory,
        [field]: value,
      });
  };
  const handleSubmit = () => {
    const payload: UpdateStockHistoryRequest = {
      supplierId: updatingStockHistory.supplierId,
      userId: updatingStockHistory.userId,
      code: updatingStockHistory.code,
      status: updatingStockHistory.status,
      note: updatingStockHistory.note,
      stockHistoryItems: updatingStockHistory.stockHistoryItems,
    };
    console.log("payload: ", payload);
    updateStockHistory(updatingStockHistoryId, payload).then((res) => {
      setFilter((prev) => ({ ...prev }));
      handleRowClick(updatingStockHistoryId);
    });
  };

  const handleDelete = () => {
    deleteStockHistory(updatingStockHistoryId).then((res) => {
      console.log(res);
      handleRowClick(updatingStockHistoryId);
      setFilter((prev) => ({ ...prev })); // Kích hoạt useEffect
    });
  };

  useEffect(() => {
    if (updatingStockHistoryId !== null) {
      getDetailStockHistory(updatingStockHistoryId)
        .then((data) => {
          setUpdatingStockHistory(data);
          setUserName(data.user.name);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy chi tiết phiếu nhập:", error);
          setUpdatingStockHistory(null);
        });
    } else {
      setUpdatingStockHistory(null); // Reset khi ID là null (collapse)
    }
  }, [updatingStockHistoryId]);

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
                <td className="p-3 border ">
                  {formatToDDMMYYYY(item.dateTime)}
                </td>
                <td className="p-3 border">{item.supplier.name}</td>
                <td className="p-3 border ">
                  {item.totalPrice.toLocaleString("en-US")}đ
                </td>
                <td className="p-3 border ">
                  {item.status === "DONE" ? "Đã nhập hàng" : "Phiếu tạm"}
                </td>
              </tr>
              {updatingStockHistoryId === item.id && updatingStockHistory && (
                <tr className="bg-gray-50">
                  <td colSpan={5} className="p-3 border">
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p>
                            <label>
                              <span>Mã phiếu nhập:</span>
                              <input
                                type="text"
                                value={updatingStockHistory.code}
                                className="w-full p-2 border rounded"
                                disabled
                              />
                            </label>
                          </p>
                          <p>
                            <label>
                              <span>Thời gian:</span>
                              <input
                                type="text"
                                value={formatToDDMMYYYY(
                                  updatingStockHistory.dateTime
                                )}
                                className="w-full p-2 border rounded"
                                disabled
                              />
                            </label>
                          </p>
                          <p>
                            <label className="relative">
                              <span>Nhà cung cấp:</span>
                              <input
                                type="text"
                                value={updatingStockHistory.supplier.name}
                                className="w-full p-2 border rounded"
                                disabled
                              />
                            </label>
                          </p>
                        </div>
                        <div>
                          <p>
                            <label>
                              <span>Trạng thái:</span>
                              <input
                                type="text"
                                value={
                                  updatingStockHistory.status === "DONE"
                                    ? "Đã nhập hàng"
                                    : "Phiếu tạm"
                                }
                                className="w-full p-2 border rounded"
                                disabled
                              />
                            </label>
                          </p>
                          <p>
                            <label>
                              <span>Người nhập:</span>
                              <input
                                type="text"
                                value={userName}
                                onChange={(e) =>
                                  handleInputChange("userName", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() =>
                                  setTimeout(
                                    () => setShowSuggestions(false),
                                    100
                                  )
                                }
                              />
                              {showSuggestions &&
                                users.length > 0 &&
                                userName && (
                                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto">
                                    {users.map((user) => (
                                      <div
                                        key={user.id}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        onMouseDown={() => {
                                          handleInputChange("userId", user.id);
                                          setUserName(user.name);
                                          setShowSuggestions(false);
                                        }}
                                      >
                                        {user.name}
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </label>
                          </p>
                          <p>
                            <label>
                              <span>Ghi chú:</span>
                              <input
                                type="text"
                                value={updatingStockHistory.note || ""}
                                onChange={(e) =>
                                  handleInputChange("note", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                              />
                            </label>
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
                          {updatingStockHistory.stockHistoryItems.map(
                            (product, index) => (
                              <tr key={index} className="bg-white">
                                <td className="p-2 border">
                                  {product.product.code}
                                </td>
                                <td className="p-2 border">
                                  {product.product.name}
                                </td>
                                <td className="p-2 border ">
                                  {product.quantity}
                                </td>
                                <td className="p-2 border ">
                                  {product.pricePerUnit.toLocaleString("en-US")}
                                </td>

                                <td className="p-2 border ">
                                  {(
                                    product.pricePerUnit * product.quantity
                                  ).toLocaleString("en-US")}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      <div className="mt-4 text-right">
                        <p>
                          <strong>Tổng số lượng:</strong>{" "}
                          {updatingStockHistory.stockHistoryItems
                            .reduce((sum, item) => sum + item.quantity, 0)
                            .toLocaleString("en-US")}
                        </p>
                        <p>
                          <strong>Tổng số mặt hàng:</strong>{" "}
                          {updatingStockHistory.stockHistoryItems.length}
                        </p>
                        <p>
                          <strong>Tổng tiền hàng:</strong>{" "}
                          {updatingStockHistory.stockHistoryItems
                            .reduce(
                              (sum, item) =>
                                sum + item.quantity * item.pricePerUnit,
                              0
                            )
                            .toLocaleString("en-US")}
                        </p>
                        <p>
                          <strong>Tổng cộng:</strong>{" "}
                          {updatingStockHistory.stockHistoryItems
                            .reduce(
                              (sum, item) =>
                                sum + item.quantity * item.pricePerUnit,
                              0
                            )
                            .toLocaleString("en-US")}
                        </p>
                        <p>
                          <strong>Tiền đã trả NCC:</strong>{" "}
                          {updatingStockHistory.stockHistoryItems
                            .reduce(
                              (sum, item) =>
                                sum + item.quantity * item.pricePerUnit,
                              0
                            )
                            .toLocaleString("en-US")}
                        </p>
                      </div>
                      <div className="flex justify-end gap-4 mt-4">
                        {/* Status Logic */}
                        {updatingStockHistory.status === "DONE" && (
                          <button
                            onClick={handleSubmit}
                            className="border rounded-md px-2 shadow-sm bg-black text-white"
                          >
                            Lưu
                          </button>
                        )}

                        {updatingStockHistory.status === "PENDING" && (
                          <>
                            <button
                              onClick={handleSubmit}
                              className="border rounded-md px-2 shadow-sm bg-black text-white"
                            >
                              Lưu
                            </button>
                            <Link
                              href={`/home/purchase-order/${updatingStockHistory.code}`}
                            >
                              <button className="border rounded-md px-2 shadow-sm bg-blue-500 text-white">
                                Mở phiếu
                              </button>
                            </Link>
                            <button
                              onClick={handleDelete}
                              className="border rounded-md px-2 shadow-sm"
                            >
                              Hủy
                            </button>
                          </>
                        )}
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
};
export default PurchaseOrderTable;

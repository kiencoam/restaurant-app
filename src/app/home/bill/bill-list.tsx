import { getDetailCustomer } from "@/app/api-client/CustomerService";
import { OrderEntity } from "@/app/api-client/OrderService";
import { PageInfo } from "@/app/api-client/PageInfo";
import {
  getPaymentsByIds,
  PaymentEntity,
} from "@/app/api-client/PaymentService";
import {
  getAllUsers,
  getDetailUser,
  UserEntity,
} from "@/app/api-client/UserService";
import { formatDateToString } from "@/utils/timeUtils";
import React, { useEffect, useState } from "react";

export default function BillList({
  bills,
  checkedRows,
  handleRowClick,
  expandedRow,
}: {
  bills: OrderEntity[];
  checkedRows: Record<string, boolean>;
  handleRowClick: (paymentId: number) => void;
  expandedRow: number | null;
}) {
  const [users, setUsers] = useState<UserEntity[]>([]);

  const [payments, setPayments] = useState<PaymentEntity[]>([]);

  // get user list
  useEffect(() => {
    const userIds = new Set(bills.map((bill) => bill.userId));
    userIds.forEach((userId) => {
      getDetailUser(userId).then((res) => setUsers((prev) => [...prev, res]));
    });
  }, [bills]);

  // get payment list
  useEffect(() => {
    const paymentIds = new Set(bills.map((bill) => bill.paymentId));
    getPaymentsByIds(Array.from(paymentIds)).then((res) => setPayments(res));
  }, [bills]);

  console.log("payments", payments);
  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 mt-6">
        <thead>
          <tr className="bg-[#f7fafc] border-b-2">
            {/* <th className="px-4 py-2 border-b text-left">
              <input
                type="checkbox"
                checked={masterChecked}
                onChange={handleMasterCheckboxChange}
              />
            </th> */}
            <th className="px-4 py-2 border-b text-left">Mã hóa đơn</th>
            <th className="px-4 py-2 border-b text-left">Thời gian (giờ đi)</th>
            <th className="px-4 py-2 border-b text-left">Khách hàng</th>
            <th className="px-4 py-2 border-b text-left">Tổng tiền hàng</th>
            <th className="px-4 py-2 border-b text-left">Giảm giá</th>
            <th className="px-4 py-2 border-b text-left">Khách đã trả</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <React.Fragment key={bill.paymentId}>
              <tr
                key={bill.paymentId}
                className={`hover:bg-gray-100 border-b-2 cursor-pointer ${
                  checkedRows[bill.paymentId] ? "bg-gray-100" : ""
                }`}
                onClick={(e) => {
                  const target = e.target as HTMLElement; // Cast to HTMLElement

                  // Ignore click on checkboxes and action buttons
                  if (
                    (target instanceof HTMLInputElement &&
                      target.type === "checkbox") ||
                    target.tagName.toLowerCase() === "button" ||
                    target.closest("button")
                  ) {
                    return;
                  }
                  handleRowClick(bill.paymentId); // Expand or collapse row
                }}
              >
                {/* <td className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    checked={!!checkedRows[bill.paymentId]}
                    onChange={() => handleRowCheckboxChange(bill.paymentId)}
                  />
                </td> */}
                <td className="px-4 py-2 border-b">{bill.paymentId}</td>
                <td className="px-4 py-2 border-b">{bill.checkOutTime}</td>
                <td className="px-4 py-2 border-b">{bill.customerId}</td>
                <td className="px-4 py-2 border-b">
                  {bill.totalCost.toLocaleString("en-US")}
                </td>
                <td className="px-4 py-2 border-b">
                  {
                    payments.find((payment) => payment.id === bill.paymentId)
                      ?.promotion
                  }
                </td>
                <td className="px-4 py-2 border-b">
                  {payments
                    .find((payment) => payment.id === bill.paymentId)
                    ?.needToPay.toLocaleString("en-US")}
                </td>
              </tr>
              {expandedRow === bill.paymentId && (
                <tr>
                  <td colSpan={7} className="bg-gray-50 p-4">
                    {/* Detailed information and editable fields */}
                    <div>
                      <form className="space-y-4">
                        <div className="flex space-x-12">
                          <div className="space-y-6">
                            <div className="flex space-x-12">
                              <label className="w-52">
                                Mã hóa đơn
                                <input
                                  type="text"
                                  value={bill.paymentId}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                />
                              </label>
                              <label className="w-52">
                                Trạng thái
                                <input
                                  type="text"
                                  value={"Hoàn thành"}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                />
                              </label>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-12">
                                <label className="w-52">
                                  Giờ đến
                                  <input
                                    type="text"
                                    value={formatDateToString(
                                      new Date(bill.checkInTime)
                                    )}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                                <label className="w-52">
                                  Phòng/bàn
                                  <input
                                    type="text"
                                    value={bill.orderTables
                                      .map((ot) => ot.table.name)
                                      .join(",")}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-12">
                                <label className="w-52">
                                  Giờ đi
                                  <input
                                    type="text"
                                    value={formatDateToString(
                                      new Date(bill.checkOutTime)
                                    )}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                                <label className="w-52">
                                  Số khách
                                  <input
                                    type="text"
                                    value={bill.numberOfPeople}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                              </div>
                            </div>

                            <div className="flex space-x-12">
                              <label className="w-52">
                                Khách hàng
                                <input
                                  type="text"
                                  value={bill.customer.name}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                />
                              </label>
                              <label className="w-52">
                                Người tạo đơn
                                <input
                                  type="text"
                                  value={
                                    users.find(
                                      (user) => user.id === bill.userId
                                    )?.name
                                  }
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                />
                              </label>
                            </div>
                            <div className="flex space-x-12">
                              <label className="w-52">
                                Ghi chú
                                <input
                                  type="text"
                                  value={bill.note}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                />
                              </label>
                              <label className="w-52">
                                Phương thức thanh toán
                                <input
                                  type="text"
                                  value={
                                    bill.paymentMethod === "CASH"
                                      ? "Tiền mặt"
                                      : "Chuyển khoản"
                                  }
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                />
                              </label>
                            </div>

                            {/* Add other editable fields as needed */}
                          </div>
                          <div className="w-full">
                            <div>
                              <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                  <tr className="bg-[#f7fafc] border-b-2">
                                    <th className="px-4 py-2 border-b text-left">
                                      Mã HH
                                    </th>
                                    <th className="px-4 py-2 border-b text-left">
                                      Tên hàng
                                    </th>
                                    <th className="px-4 py-2 border-b text-right w-[140px]">
                                      Số lượng
                                    </th>
                                    <th className="px-4 py-2 border-b text-right w-[140px]">
                                      Đơn giá
                                    </th>
                                    <th className="px-4 py-2 border-b text-right w-[140px]">
                                      Thành tiền
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {bill.orderItems.map((orderItem) => (
                                    <tr key={orderItem.id}>
                                      <td className="px-4 py-2 border-b">
                                        {orderItem.id}
                                      </td>
                                      <td className="px-4 py-2 border-b ">
                                        {orderItem.menuItem.title}
                                      </td>
                                      <td className="px-4 py-2 border-b text-right">
                                        {orderItem.orderedQuantity}
                                      </td>
                                      <td className="px-4 py-2 border-b text-right">
                                        {orderItem.price.toLocaleString(
                                          "en-US"
                                        )}
                                      </td>
                                      <td className="px-4 py-2 border-b text-right">
                                        {(
                                          orderItem.price *
                                          orderItem.orderedQuantity
                                        ).toLocaleString("en-US")}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </form>
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
}

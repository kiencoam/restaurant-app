import React, { useState } from "react";

export default function BillList({
  bills,
  masterChecked,
  checkedRows,
  handleMasterCheckboxChange,
  handleRowCheckboxChange,
  handleRowClick,
  expandedRow,
}) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate total pages
  const totalPages = Math.ceil(bills.length / rowsPerPage);

  // Get current page rows
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRowsBills = bills.slice(startIndex, startIndex + rowsPerPage);

  // Handle page change
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  //Handle rowsPerPage change
  const changeRowsPerPage = (rows) => {
    setRowsPerPage(rows);
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 mt-6">
        <thead>
          <tr className="bg-[#f7fafc] border-b-2">
            <th className="px-4 py-2 border-b text-left">
              <input
                type="checkbox"
                checked={masterChecked}
                onChange={handleMasterCheckboxChange}
              />
            </th>
            <th className="px-4 py-2 border-b text-left">Mã hóa đơn</th>
            <th className="px-4 py-2 border-b text-left">Thời gian (giờ đi)</th>
            <th className="px-4 py-2 border-b text-left">Khách hàng</th>
            <th className="px-4 py-2 border-b text-left">Tổng tiền hàng</th>
            <th className="px-4 py-2 border-b text-left">Giảm giá</th>
            <th className="px-4 py-2 border-b text-left">Khách đã trả</th>
          </tr>
        </thead>
        <tbody>
          {currentRowsBills.map((bill) => (
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
                <td className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    checked={!!checkedRows[bill.paymentId]}
                    onChange={() => handleRowCheckboxChange(bill.paymentId)}
                  />
                </td>
                <td className="px-4 py-2 border-b">{bill.paymentId}</td>
                <td className="px-4 py-2 border-b">{bill.checkOutTime}</td>
                <td className="px-4 py-2 border-b">{bill.customerId}</td>
                <td className="px-4 py-2 border-b">{bill.totalPrice}</td>
                <td className="px-4 py-2 border-b">{bill.promotion}</td>
                <td className="px-4 py-2 border-b">{bill.needToPay}</td>
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
                                    value={bill.checkInTime}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                                <label className="w-52">
                                  Phòng/bàn
                                  <input
                                    type="text"
                                    value={bill.orderTables}
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
                                    value={bill.checkOutTime}
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
                                  value={bill.customerId}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                />
                              </label>
                              <label className="w-52">
                                Người tạo đơn
                                <input
                                  type="text"
                                  value={bill.userId}
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
                                        {orderItem.id}
                                      </td>
                                      <td className="px-4 py-2 border-b text-right">
                                        {orderItem.orderedQuantity}
                                      </td>
                                      <td className="px-4 py-2 border-b text-right">
                                        {orderItem.price}
                                      </td>
                                      <td className="px-4 py-2 border-b text-right">
                                        {orderItem.price *
                                          orderItem.orderedQuantity}
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
      <div className="flex items-center space-x-8 mt-4">
        <div className="flex">
          <div>Số bản ghi: </div>
          <select
            className="bg-[#f7f7f7] outline-none"
            value={rowsPerPage}
            onChange={(e) => changeRowsPerPage(Number(e.target.value))}
          >
            <option defaultValue={rowsPerPage}>{rowsPerPage}</option>
            <option value={5}>
              5
            </option>
            <option value={10}>
              10
            </option>
            <option value={15}>
              15
            </option>
            <option value={20}>
              20
            </option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

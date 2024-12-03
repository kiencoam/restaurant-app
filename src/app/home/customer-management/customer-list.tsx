import { formatDateTime } from "@/utils/timeUtils";
import React, { useState } from "react";

export default function CustomerList({
  customers,
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
  const totalPages = Math.ceil(customers.length / rowsPerPage);

  // Get current page rows
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRowsCustomers = customers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

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
            <th className="px-4 py-2 border-b text-left">Mã khách hàng</th>
            <th className="px-4 py-2 border-b text-left">Tên khách hàng</th>
            <th className="px-4 py-2 border-b text-left">Điện thoại</th>
            <th className="px-4 py-2 border-b text-left">Tổng bán</th>
          </tr>
        </thead>
        <tbody>
          {currentRowsCustomers.map((customer) => (
            <React.Fragment key={customer.id}>
              <tr
                key={customer.id}
                className={`hover:bg-gray-100 border-b-2 cursor-pointer ${
                  checkedRows[customer.id] ? "bg-gray-100" : ""
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
                  handleRowClick(customer.id); // Expand or collapse row
                }}
              >
                <td className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    checked={!!checkedRows[customer.id]}
                    onChange={() => handleRowCheckboxChange(customer.id)}
                  />
                </td>
                <td className="px-4 py-2 border-b text-blue-600">
                  <button>{customer.id}</button>
                </td>
                <td className="px-4 py-2 border-b">{customer.name}</td>
                <td className="px-4 py-2 border-b">{customer.phoneNumber}</td>
                <td className="px-4 py-2 border-b">{customer.totalCost}</td>
              </tr>
              {expandedRow === customer.id && (
                <tr>
                  <td colSpan={5} className="bg-gray-50 p-4">
                    {/* Detailed information and editable fields */}
                    <div className="space-y-4">
                      <div className="flex space-x-12">
                        <label className="w-64">
                          Mã khách hàng:
                          <input
                            type="text"
                            value={customer.id}
                            className="w-full border-b-2 bg-gray-50 mt-2"
                            disabled
                          />
                        </label>
                        <label className="w-64">
                          Email:
                          <input
                            type="text"
                            value={customer.email}
                            className="w-full border-b-2 bg-gray-50 mt-2"
                            disabled
                          />
                        </label>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-12">
                          <label className="w-64">
                            Tên khách hàng
                            <input
                              type="text"
                              value={customer.name}
                              className="w-full border-b-2 bg-gray-50 mt-2"
                              disabled
                            />
                          </label>
                          <label className="w-64">
                            Điện thoại
                            <input
                              type="text"
                              value={customer.phoneNumber}
                              className="w-full border-b-2 bg-gray-50 mt-2"
                              disabled
                            />
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-12">
                          <label className="w-64">
                            Ngày sinh
                            <input
                              type="text"
                              value={customer.dob}
                              className="w-full border-b-2 bg-gray-50 mt-2"
                              disabled
                            />
                          </label>
                          <label className="w-64">
                            Địa chỉ
                            <input
                              type="text"
                              value={customer.address}
                              className="w-full border-b-2 bg-gray-50 mt-2"
                              disabled
                            />
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-12">
                          <label className="w-64">
                            Ghi chú
                            <input
                              type="text"
                              value={customer.note}
                              className="w-full border-b-2 bg-gray-50 mt-2"
                              disabled
                            />
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRowClick(customer.id)}
                            className="border rounded-md px-2 shadow-sm bg-black text-white"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => handleRowClick(customer.id)}
                            className="border rounded-md px-2 shadow-sm"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                      {/* Add other editable fields as needed */}
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
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
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

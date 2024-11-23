import { formatDateTime } from "@/utils/timeUtils";
import React from "react";

export default function CustomerList({
  customers,
  masterChecked,
  checkedRows,
  handleMasterCheckboxChange,
  handleRowCheckboxChange,
  handleRowClick,
  expandedRow,
}) {
  return (
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
        {customers.map((customer) => (
          <React.Fragment key={customer.id}>
            <tr
              key={customer.id}
              className={` border-b-2 cursor-pointer ${
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
                      <label
                        className="w-64"
                      >
                        Mã khách hàng:
                        <input
                          type="text"
                          value={customer.id}
                          className="w-full border-b-2 bg-gray-50 mt-2"
                          disabled
                        />
                      </label>
                      <label
                        className="w-64"
                      >
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
                        <label
                          className="w-64"
                        >
                          Tên khách hàng
                          <input
                            type="text"
                            value={customer.name}
                            className="w-full border-b-2 bg-gray-50 mt-2"
                            disabled
                          />
                        </label>
                        <label
                          className="w-64"
                        >
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
                        <label
                          className="w-64"
                        >
                          Ngày sinh
                          <input
                            type="text"
                            value={customer.dob}
                            className="w-full border-b-2 bg-gray-50 mt-2"
                            disabled
                          />
                        </label>
                        <label
                          className="w-64"
                        >
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
                        <label
                          className="w-64"
                        >
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
  );
}

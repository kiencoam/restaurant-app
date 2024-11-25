import { formatDateTime } from "@/utils/timeUtils";
import React from "react";

export default function SupplierList({
  suppliers,
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
          <th className="px-4 py-2 border-b text-left">Mã nhà cung cấp</th>
          <th className="px-4 py-2 border-b text-left">Tên nhà cung cấp</th>
          <th className="px-4 py-2 border-b text-right">Nợ hiện tại</th>
          <th className="px-4 py-2 border-b text-right">Tổng mua</th>
          <th className="px-4 py-2 border-b text-left">Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supllier) => (
          <React.Fragment key={supllier.id}>
            <tr
              key={supllier.id}
              className={` border-b-2 cursor-pointer ${
                checkedRows[supllier.id] ? "bg-gray-100" : ""
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
                handleRowClick(supllier.id); // Expand or collapse row
              }}
            >
              <td className="px-4 py-2 border-b">
                <input
                  type="checkbox"
                  checked={!!checkedRows[supllier.id]}
                  onChange={() => handleRowCheckboxChange(supllier.id)}
                />
              </td>
              <td className="px-4 py-2 border-b text-blue-600">
                <button>{supllier.id}</button>
              </td>
              <td className="px-4 py-2 border-b">{supllier.name}</td>
              <td className="px-4 py-2 border-b text-right">
                {supllier.totalDebt}
              </td>
              <td className="px-4 py-2 border-b text-right">
                {supllier.totalCost}
              </td>
              <td className="px-4 py-2 border-b">
                {supllier.status === "ACTIVE"
                  ? "Đang hoạt động"
                  : "Ngừng hoạt động"}
              </td>
            </tr>
            {expandedRow === supllier.id && (
              <tr>
                <td colSpan={6} className="bg-gray-50 p-4">
                  {/* Detailed information and editable fields */}
                  <div className="space-y-4">
                    <div className="flex space-x-12">
                      <label className="w-64">
                        Mã nhà cung cấp:
                        <input
                          type="text"
                          value={supllier.id}
                          className="w-full border-b-2 bg-gray-50 mt-2"
                          disabled
                        />
                      </label>
                      <label className="w-64">
                        Email:
                        <input
                          type="text"
                          value={supllier.email}
                          className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                        />
                      </label>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-12">
                        <label className="w-64">
                          Tên khách hàng
                          <input
                            type="text"
                            value={supllier.name}
                            className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                          />
                        </label>
                        <label className="w-64">
                          Điện thoại
                          <input
                            type="text"
                            value={supllier.phoneNumber}
                            className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-12">
                        <label className="w-64">
                          Địa chỉ
                          <input
                            type="text"
                            value={supllier.address}
                            className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                          />
                        </label>
                        <label className="w-64">
                          Nợ hiện tại
                          <input
                            type="text"
                            value={supllier.totalDebt}
                            className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
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
                            value={supllier.note}
                            className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                          />
                        </label>
                        <label className="w-64">
                          Tổng mua
                          <input
                            type="text"
                            value={supllier.totalCost}
                            className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-12">
                        <label className="w-64">
                          Trạng thái
                          <select className="w-full border-b-2 bg-gray-50 mt-2 outline-none">
                            <option selected={supllier.status}>{supllier.status == "ACTIVE"?"Đang hoạt động":"Ngừng hoạt động"}</option>
                            <option value="ACTIVE">Đang hoạt động</option>
                            <option value="INACTIVE">Ngừng hoạt động</option>
                          </select>
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRowClick(supllier.id)}
                          className="border rounded-md px-2 shadow-sm bg-black text-white"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => handleRowClick(supllier.id)}
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
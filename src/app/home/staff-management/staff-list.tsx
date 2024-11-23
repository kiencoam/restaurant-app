import { formatDateTime } from "@/utils/timeUtils";
import React from "react";
import { Tooltip } from "react-tooltip";

export default function StaffList({
  staffs,
  masterChecked,
  checkedRows,
  handleMasterCheckboxChange,
  handleRowCheckboxChange,
  handleRowClick,
  expandedRow,
  isNewStaff,
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
          <th className="px-4 py-2 border-b text-left">Mã nhân viên</th>
          <th className="px-4 py-2 border-b text-left">Tên nhân viên</th>
          <th className="px-4 py-2 border-b text-left">Điện thoại</th>
          <th className="px-4 py-2 border-b text-left">Vai trò</th>
        </tr>
      </thead>
      <tbody>
        {staffs.map((staff) => (
          <React.Fragment key={staff.id}>
            <tr
              key={staff.id}
              className={` border-b-2 cursor-pointer ${
                checkedRows[staff.id] ? "bg-gray-100" : ""
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
                handleRowClick(staff.id); // Expand or collapse row
              }}
            >
              <td className="px-4 py-2 border-b">
                <input
                  type="checkbox"
                  checked={!!checkedRows[staff.id]}
                  onChange={() => handleRowCheckboxChange(staff.id)}
                />
              </td>
              <td className="px-4 py-2 border-b text-blue-600">
                <button>{staff.id}</button>
              </td>
              <td className="px-4 py-2 border-b">{staff.name}</td>
              <td className="px-4 py-2 border-b">{staff.phoneNumber}</td>
              <td className="px-4 py-2 border-b">{staff.position}</td>
            </tr>
            {expandedRow === staff.id && (
              <tr>
                <td colSpan={5} className="bg-gray-50 p-4">
                  {/* Detailed information and editable fields */}
                  <div>
                    <form className="space-y-4">
                      <div className="flex space-x-12">
                        <label className="w-64">
                          Mã nhân viên
                          <input
                            type="text"
                            value={staff.id}
                            className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                          />
                        </label>
                        <label className="w-64">
                          Email
                          <input
                            type="text"
                            value={staff.email}
                            className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                          />
                        </label>
                        <label className="w-64">
                          Tài khoản đăng nhập
                          <input
                            type="text"
                            className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                            disabled
                          />
                        </label>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-12">
                          <label className="w-64">
                            Tên nhân viên
                            <input
                              type="text"
                              value={staff.name}
                              className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                            />
                          </label>
                          <label className="w-64">
                            Điện thoại
                            <input
                              type="text"
                              value={staff.phoneNumber}
                              className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                            />
                          </label>
                          <label className="w-64">
                            Trạng thái
                            <select className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black">
                              <option selected>
                                {staff.status === "IN"
                                  ? "Đang làm việc"
                                  : "Đã nghỉ"}
                              </option>
                              <option value="IN">Đang làm việc</option>
                              <option value="OUT">Đã nghỉ</option>
                            </select>
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-12">
                          <label className="w-64">
                            Ngày sinh
                            <input
                              type="text"
                              value={staff.dob}
                              className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                            />
                          </label>
                          <label className="w-64">
                            Địa chỉ
                            <input
                              type="text"
                              value={staff.address}
                              className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-12">
                          <label className="w-64">
                            Loại lương
                            <select className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black">
                              <option selected={staff.salaryType}>{staff.salaryType === "HOURLY"?"Theo giờ":"Theo ngày"}</option>
                              <option value="HOURLY">Theo giờ</option>
                              <option value="DAYLY">Theo ngày</option>
                            </select>
                          </label>
                          <label className="w-64">
                            Lương theo giờ
                            <input
                              type="text"
                              value={staff.salaryPerHour}
                              className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
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
                              value={staff.note}
                              className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                            />
                          </label>
                          <label className="w-64">
                            Lương theo tháng
                            <input
                              type="text"
                              value={staff.salaryPerMonth}
                              className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRowClick(staff.id)}
                            className="border rounded-md px-2 shadow-sm bg-black text-white"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => handleRowClick(staff.id)}
                            className="border rounded-md px-2 shadow-sm"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                      {/* Add other editable fields as needed */}
                    </form>
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

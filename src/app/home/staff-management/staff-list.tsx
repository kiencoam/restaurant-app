import React, { useState } from "react";

export default function StaffList({
  staffs,
  masterChecked,
  checkedRows,
  handleMasterCheckboxChange,
  handleRowCheckboxChange,
  handleRowClick,
  expandedRow,
}) {
  const [isCharsVisible, changeCharsVisibility] = useState(false);

  const toggleCharsVisibility = () => {
    changeCharsVisibility(!isCharsVisible);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate total pages
  const totalPages = Math.ceil(staffs.length / rowsPerPage);

  // Get current page rows
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRowsStaffs = staffs.slice(startIndex, startIndex + rowsPerPage);

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
            <th className="px-4 py-2 border-b text-left">Mã nhân viên</th>
            <th className="px-4 py-2 border-b text-left">Tên nhân viên</th>
            <th className="px-4 py-2 border-b text-left">Điện thoại</th>
            <th className="px-4 py-2 border-b text-left">Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {currentRowsStaffs.map((staff) => (
            <React.Fragment key={staff.id}>
              <tr
                key={staff.id}
                className={`hover:bg-gray-100 border-b-2 cursor-pointer ${
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
                            Mật khẩu
                            <div className="flex">
                              <input
                                type={isCharsVisible ? "text" : "password"}
                                value={staff.password}
                                className="w-full border-b-2 bg-[#f7fafc] mt-2 outline-none"
                              />
                              <button
                                type="button"
                                className="border-b-2"
                                onClick={toggleCharsVisibility}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#000000"
                                >
                                  <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                </svg>
                              </button>
                            </div>
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
                                <option selected={staff.salaryType}>
                                  {staff.salaryType === "HOURLY"
                                    ? "Theo giờ"
                                    : "Theo ngày"}
                                </option>
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

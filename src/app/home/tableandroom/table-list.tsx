import { formatDateTime } from "@/utils/timeUtils";
import React, { useState } from "react";

export default function TableList({ tables, handleRowClick, expandedRow }) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate total pages
  const totalPages = Math.ceil(tables.length / rowsPerPage);

  // Get current page rows
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRowsTables = tables.slice(startIndex, startIndex + rowsPerPage);

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
            <th className="px-4 py-2 border-b text-left">Mã phòng/bàn</th>
            <th className="px-4 py-2 border-b text-left">Tên phòng/bàn</th>
            <th className="px-4 py-2 border-b text-left">Khu vực</th>
            <th className="px-4 py-2 border-b text-left">Số ghế</th>
            <th className="px-4 py-2 border-b text-left">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {currentRowsTables.map((table) => (
            <React.Fragment key={table.id}>
              <tr
                key={table.id}
                className="hover:bg-gray-100 border-b-2 cursor-pointer"
                onClick={(e) => {
                  handleRowClick(table.id); // Expand or collapse row
                }}
              >
                <td className="px-4 py-2 border-b text-blue-600">
                  <button>{table.id}</button>
                </td>
                <td className="px-4 py-2 border-b">{table.name}</td>
                <td className="px-4 py-2 border-b">{table.location}</td>
                <td className="px-4 py-2 border-b">{table.capacity}</td>
                <td className="px-4 py-2 border-b">
                  {table.isActive === true
                    ? "Đang hoạt động"
                    : "Ngừng hoạt động"}
                </td>
              </tr>
              {expandedRow === table.id && (
                <tr>
                  <td colSpan={6} className="bg-gray-50 p-4">
                    {/* Detailed information and editable fields */}
                    <div className="space-y-4">
                      <div className="flex space-x-12">
                        <label className="w-64">
                          Mã phòng/bàn:
                          <input
                            type="text"
                            value={table.id}
                            className="w-full border-b-2 bg-gray-50 mt-2"
                            disabled
                          />
                        </label>
                        <label className="w-64">
                          Tên phòng/bàn:
                          <input
                            type="text"
                            value={table.name}
                            className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                          />
                        </label>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-12">
                          <label className="w-64">
                            Khu vực
                            <input
                              type="text"
                              value={table.location}
                              className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                            />
                          </label>
                          <label className="w-64">
                            Số ghế
                            <input
                              type="text"
                              value={table.capacity}
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
                              <option selected={table.isActive}>
                                {table.isActive === true
                                  ? "Đang hoạt động"
                                  : "Ngừng hoạt động"}
                              </option>
                              <option value = "true">Đang hoạt động</option>
                              <option value = "false">Ngừng hoạt động</option>
                            </select>
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRowClick(table.id)}
                            className="border rounded-md px-2 shadow-sm bg-black text-white"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => handleRowClick(table.id)}
                            className="border rounded-md px-2 shadow-sm"
                          >
                            Xóa
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
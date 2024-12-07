import React, { useState } from "react";
import { Tooltip } from "react-tooltip";

export default function PaysheetList({
  paysheets,
  masterChecked,
  checkedRows,
  handleMasterCheckboxChange,
  handleRowCheckboxChange,
  handleRowClick,
  expandedRow,
}) {
  const [updatedPaysheets, setUpdatedPaysheets] = useState(paysheets);

  const handlePaidSalaryChange = (paysheetId, salaryDetailId, newValue) => {
    setUpdatedPaysheets((prevPaysheets) =>
      prevPaysheets.map((paysheet) =>
        paysheet.id === paysheetId
          ? {
              ...paysheet,
              salaryDetails: paysheet.salaryDetails.map((detail) =>
                detail.id === salaryDetailId
                  ? { ...detail, paidSalary: newValue }
                  : detail
              ),
            }
          : paysheet
      )
    );
  };

  const handleNameChange = (paysheetId, newName) => {
    setUpdatedPaysheets((prevPaysheets) =>
      prevPaysheets.map((paysheet) =>
        paysheet.id === paysheetId ? { ...paysheet, title: newName } : paysheet
      )
    );
  };

  const handleStatusChange = (paysheetId, newStatus) => {
    setUpdatedPaysheets((prevPaysheets) =>
      prevPaysheets.map((paysheet) =>
        paysheet.id === paysheetId
          ? { ...paysheet, status: newStatus }
          : paysheet
      )
    );
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate total pages
  const totalPages = Math.ceil(updatedPaysheets.length / rowsPerPage);

  // Get current page rows
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRowsPaysheets = updatedPaysheets.slice(
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
            <th className="px-4 py-2 border-b text-left">Mã</th>
            <th className="px-4 py-2 border-b text-left">Tên</th>
            <th className="px-4 py-2 border-b text-left">Kỳ làm việc</th>
            <th className="px-4 py-2 border-b text-left">Tổng lương</th>
            <th className="px-4 py-2 border-b text-left">Đã trả</th>
            <th className="px-4 py-2 border-b text-left">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {currentRowsPaysheets.map((paysheet) => (
            <React.Fragment key={paysheet.id}>
              <tr
                key={paysheet.id}
                className={` border-b-2 cursor-pointer ${
                  checkedRows[paysheet.id] ? "bg-gray-100" : ""
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
                  handleRowClick(paysheet.id); // Expand or collapse row
                }}
              >
                <td className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    checked={!!checkedRows[paysheet.id]}
                    onChange={() => handleRowCheckboxChange(paysheet.id)}
                  />
                </td>
                <td className="px-4 py-2 border-b">{paysheet.code}</td>
                <td className="px-4 py-2 border-b max-w-[230px] w-[230px] truncate">
                  {paysheet.title}
                </td>
                <td className="px-4 py-2 border-b">
                  {paysheet.fromDate} - {paysheet.toDate}
                </td>
                <td className="px-4 py-2 border-b">{paysheet.totalSalary}</td>
                <td className="px-4 py-2 border-b">{paysheet.paidSalary}</td>
                <td className="px-4 py-2 border-b">
                  {paysheet.status === "PROCESSING"
                    ? "Tạm tính"
                    : "Đã chốt lương"}
                </td>
              </tr>
              {expandedRow === paysheet.id && (
                <tr>
                  <td colSpan={7} className="bg-gray-50 p-4">
                    {/* Detailed information and editable fields */}
                    <div>
                      <form className="space-y-4">
                        <div className="flex space-x-12">
                          <div className="space-y-6">
                            <div className="flex space-x-12">
                              <label className="w-52">
                                Mã
                                <input
                                  type="text"
                                  value={paysheet.code}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                />
                              </label>
                              <label className="w-52">
                                Tổng số nhân viên
                                <input
                                  type="text"
                                  value={paysheet.salaryDetails.length}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                />
                              </label>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-12">
                                <label className="w-52">
                                  Tên
                                  <input
                                    type="text"
                                    value={paysheet.title}
                                    onChange={(e) =>
                                      handleNameChange(
                                        paysheet.id,
                                        e.target.value
                                      )
                                    }
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  />
                                </label>
                                <label className="w-52">
                                  Tổng lương
                                  <input
                                    type="text"
                                    value={paysheet.totalSalary}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-12">
                                <label className="w-52">
                                  Kỳ làm việc
                                  <input
                                    type="text"
                                    value={
                                      paysheet.fromDate +
                                      " - " +
                                      paysheet.toDate
                                    }
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                                <label className="w-52">
                                  Đã trả
                                  <input
                                    type="text"
                                    value={paysheet.paidSalary}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                              </div>
                            </div>

                            <div className="flex space-x-12">
                              <label className="w-52">
                                Trạng thái
                                <select
                                  value={paysheet.status}
                                  onChange={(e) =>
                                    handleStatusChange(
                                      paysheet.id,
                                      e.target.value
                                    )
                                  }
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                >
                                  <option value="PROCESSING">Tạm tính</option>
                                  <option value="DONE">Đã chốt lương</option>
                                </select>
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
                                      Mã phiếu
                                    </th>
                                    <th className="px-4 py-2 border-b text-left">
                                      Tên nhân viên
                                    </th>
                                    <th className="px-4 py-2 border-b text-right w-[140px]">
                                      Tổng lương
                                    </th>
                                    <th className="px-4 py-2 border-b text-right w-[140px]">
                                      Đã trả NV
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {paysheet.salaryDetails.map(
                                    (salaryDetail) => (
                                      <tr key={salaryDetail.id}>
                                        <td className="px-4 py-2 border-b">
                                          {salaryDetail.code}
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                          {salaryDetail.userName}
                                        </td>
                                        <td className="px-4 py-2 border-b text-right">
                                          {salaryDetail.totalSalary}
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                          <input
                                            type="text"
                                            value={salaryDetail.paidSalary}
                                            onChange={(e) =>
                                              handlePaidSalaryChange(
                                                paysheet.id,
                                                salaryDetail.id,
                                                e.target.value
                                              )
                                            }
                                            className="w-full border-b-2 outline-none focus:border-b-black text-right"
                                          />
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="flex pt-2 items-center space-x-4">
                          <div>
                            Dữ liệu được tải lại vào:
                            <span className="font-bold">
                              {" "}
                              {paysheet.updatedTime}
                            </span>
                          </div>
                          <button
                            type="button"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Tải lại bảng lương để xem dữ liệu mới nhất"
                          >
                            <Tooltip id="my-tooltip" />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#000000"
                            >
                              <path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex justify-end ">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRowClick(paysheet.id)}
                              className="border rounded-md px-2 shadow-sm bg-black text-white"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={() => handleRowClick(paysheet.id)}
                              className="border rounded-md px-2 shadow-sm"
                            >
                              Hủy
                            </button>
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

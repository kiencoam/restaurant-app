"use client";

import React, { useState, useRef, useEffect } from "react";
import CreatePaysheet from "./create-paysheet";
import PaysheetList from "./paysheet-list";
import "react-datepicker/dist/react-datepicker.css";
import { PageInfo } from "@/app/api-client/PageInfo";
import { GetStaffRequest } from "../staff-management/page";
import { getAllUsers, UserEntity } from "@/app/api-client/UserService";
import {
  deleteSalaryPeriod,
  getAll,
  SalaryPeriodEntity,
} from "@/app/api-client/SalaryPeriodService";
import { SalaryPeriodStatusEnum } from "@/app/constants/SalaryPeriodStatusEnum";
import { DeleteModal } from "@/components/DeleteModal";

export type GetSalaryPeriodRequest = {
  page: number;
  page_size: number;
  title?: string;
  status?: string;
};

export type GetSalaryDetailRequest = {
  page: number;
  page_size: number;
  user_id?: number;
  salary_period_id?: number;
  status?: string;
};

const PaysheetPage = () => {
  const [users, setUsers] = useState<UserEntity[]>([]);

  const [salaryPeriods, setSalaryPeriods] = useState<SalaryPeriodEntity[]>([]);

  const [masterChecked, setMasterChecked] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const [isNewPaysheet, setIsNewPaysheet] = useState(false);

  const [checkedRows, setCheckedRows] = useState({});

  const [flyOutActions, setFlyOutActions] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);

  const [expandedRow, setExpandedRow] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPage: null,
    totalRecord: null,
    pageSize: null,
    nextPage: null,
    previousPage: null,
  });

  const [periodFilter, setPeriodFilter] = useState<GetSalaryPeriodRequest>({
    page: 0,
    page_size: 5,
  });

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= pageInfo.totalPage) {
      setCurrentPage(newPage);
      handlePageNumberChange(newPage - 1);
    }
  };

  //Handle rowsPerPage change
  const changeRowsPerPage = (pageSize) => {
    setRowsPerPage(pageSize);
    handlePageSizeChange(pageSize);
  };

  const handlePageSizeChange = (value: number) => {
    setPeriodFilter({
      ...periodFilter,
      page_size: value,
      page: 0,
    });
  };

  const handlePageNumberChange = (value: number) => {
    setPeriodFilter({
      ...periodFilter,
      page: value,
    });
  };

  const isAnyRowChecked = Object.values(checkedRows).some(Boolean);

  const handleRowClick = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null); // Collapse the row if it's already expanded
    } else {
      setExpandedRow(id); // Expand the clicked row
    }
  };

  const toggleNewPaysheet = () => {
    setIsNewPaysheet((prev) => !prev);
  };

  const toggleFilterDropdown = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMasterCheckboxChange = () => {
    const newMasterChecked = !masterChecked;
    setMasterChecked(newMasterChecked);

    const updatedCheckedRows = {};
    salaryPeriods.forEach((staff) => {
      updatedCheckedRows[staff.id] = newMasterChecked;
    });
    setCheckedRows(updatedCheckedRows);
  };

  useEffect(() => {
    // Sync master checkbox with individual row checkboxes
    const allChecked = salaryPeriods.every((staff) => checkedRows[staff.id]);
    setMasterChecked(allChecked);
  }, [checkedRows, salaryPeriods]);

  const handleRowCheckboxChange = (id) => {
    const updatedCheckedRows = {
      ...checkedRows,
      [id]: !checkedRows[id],
    };
    setCheckedRows(updatedCheckedRows);
  };

  const handleFilterChange = (e, field) => {
    let newValue = e.target.value;
    // if (newValue === "") {
    //   newValue = null;
    // } else {
    //   newValue = Number(newValue);
    // }

    setPeriodFilter({
      ...periodFilter,
      [field]: newValue,
    });
  };

  //userFilter
  const [filter, setFilter] = useState<GetStaffRequest>({
    page: 0,
    page_size: 5,
  });

  //Lấy tất cả User
  useEffect(() => {
    const query = Object.entries(filter)
      .map(([key, value]) => {
        if (value) {
          return `${key}=${value}`;
        }
      })
      .join("&");
    getAllUsers(query).then((data) => {
      setUsers(data.second);
    });
    // console.log(query)
  }, [filter]);

  //Lấy tất cả SalaryPeriods
  useEffect(() => {
    const query = Object.entries(periodFilter)
      .map(([key, value]) => {
        if (value) {
          return `${key}=${value}`;
        }
      })
      .join("&");
    getAll(query).then((data) => {
      setPageInfo(data.first);
      setSalaryPeriods(data.second);
    });
    // console.log(query)
  }, [periodFilter]);

  const handleDeletePeriod = () => {
    const selectedIds = Object.keys(checkedRows)
      .filter((id) => checkedRows[id])
      .map((id) => Number(id));
    console.log(selectedIds);

    if (selectedIds.length === 0) {
      alert("Không có bảng lương nào được chọn để xóa.");
      return;
    }
    // Call API deleteSalaryPeriod
    Promise.all(selectedIds.map((id) => deleteSalaryPeriod(id)))
      .then(() => {
        // alert("Xóa thành công!");
        const newCheckedRows = { ...checkedRows };
        selectedIds.forEach((id) => {
          delete newCheckedRows[id];
        });
        setCheckedRows(newCheckedRows);
        setPeriodFilter((prev) => ({ ...prev })); // Kích hoạt useEffect
      })
      .catch((error) => {
        alert("Có lỗi khi xóa bảng lương.");
        console.error(error);
      });
    setDeleteModal(false);
  };

  return (
    <div className="w-full h-screen font-nunito bg-[#f7f7f7]">
      <div className="flex p-6 justify-between items-center">
        <div className="text-2xl font-extrabold">Bảng lương</div>
        <div className="flex items-center gap-2">
          <ul>
            {isAnyRowChecked && (
              <li
                className="lg:px-8 relative flex items-center space-x-1"
                onMouseEnter={() => setFlyOutActions(true)}
                onMouseLeave={() => setFlyOutActions(false)}
              >
                <a
                  className="text-slate-800 hover:text-slate-900"
                  aria-expanded={flyOutActions}
                >
                  Thao tác
                </a>
                <button
                  className="shrink-0 p-1"
                  aria-expanded={flyOutActions}
                  onClick={(e) => {
                    e.preventDefault();
                    setFlyOutActions(!flyOutActions);
                  }}
                >
                  <span className="sr-only">Show submenu for Flyout Menu</span>
                  <svg
                    className="w-3 h-3 fill-slate-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                  >
                    <path d="M10 2.586 11.414 4 6 9.414.586 4 2 2.586l4 4z" />
                  </svg>
                </button>

                {/* 2nd level menu */}
                {flyOutActions && (
                  <ul className="origin-top-right absolute top-full left-1/2 -translate-x-1/2 w-[120px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl">
                    <li>
                      <button
                        className="text-slate-800 text-center w-[100px] hover:bg-slate-50 p-2"
                        onClick={() => setDeleteModal(true)}
                      >
                        Xóa
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Modal xác nhận xóa */}
            <DeleteModal
              type="bảng lương"
              isOpen={deleteModal}
              onClose={() => setDeleteModal(false)}
              onDelete={handleDeletePeriod}
            />
          </ul>
          <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1011 17a6 6 0 006-6z"
              />
            </svg>
            <input
              className="p-2 bg-transparent outline-none w-60"
              type="text"
              placeholder="Tên bảng lương"
              onChange={(e) => handleFilterChange(e, "title")}
            />
          </div>

          <div>
            <button
              className="flex items-center border rounded-md px-2 shadow-sm"
              onClick={toggleFilterDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              <div className="p-2 text-sm font-semibold">Filter</div>
            </button>

            {isFilterOpen && (
              <div
                ref={filterRef}
                className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg divide-y-2"
              >
                <div className="p-2">
                  <p className="font-bold m-2 px-2">Trạng thái</p>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="salaryStatus"
                      value=""
                      checked={periodFilter.status === ""}
                      onChange={(e) => handleFilterChange(e, "status")}
                      className="form-radio"
                    />
                    <span>Tất cả</span>
                  </label>

                  {/* Chọn Tạm tính */}
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="salaryStatus"
                      value={SalaryPeriodStatusEnum.Processing}
                      checked={
                        periodFilter.status ===
                        SalaryPeriodStatusEnum.Processing
                      }
                      onChange={(e) => handleFilterChange(e, "status")}
                      className="form-radio"
                    />
                    <span>Tạm tính</span>
                  </label>

                  {/* Chọn Đã chốt lương */}
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="salaryStatus"
                      value={SalaryPeriodStatusEnum.Done}
                      checked={
                        periodFilter.status === SalaryPeriodStatusEnum.Done
                      }
                      onChange={(e) => handleFilterChange(e, "status")}
                      className="form-radio"
                    />
                    <span>Đã chốt lương</span>
                  </label>
                </div>
              </div>
            )}
          </div>
          <button
            className="flex items-center border rounded-md px-2 shadow-sm bg-black"
            onClick={toggleNewPaysheet}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="white"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="p-2 text-sm font-bold text-white">Tạo mới</div>
          </button>
          {isNewPaysheet && (
            <CreatePaysheet
              toggleNewPaysheet={toggleNewPaysheet}
              setPeriodFilter={setPeriodFilter}
              // filterUser={filterUser}
              // searchUser={searchUser}
              // setSearchUser={setSearchUser}
              // newPaysheet={newPaysheet}
              // setNewPaysheet={setNewPaysheet}
            />
          )}
        </div>
      </div>
      <div className="px-6">
        <PaysheetList
          salaryPeriods={salaryPeriods}
          setSalaryPeriods={setSalaryPeriods}
          masterChecked={masterChecked}
          checkedRows={checkedRows}
          pageInfo={pageInfo}
          handleMasterCheckboxChange={handleMasterCheckboxChange}
          handleRowCheckboxChange={handleRowCheckboxChange}
          handleRowClick={handleRowClick}
          expandedRow={expandedRow}
          handlePageSizeChange={handlePageSizeChange}
          handlePageNumberChange={handlePageNumberChange}
          setPeriodFilter={setPeriodFilter}
        />
        <div className="flex items-center space-x-8 mt-4">
          <div className="flex">
            <div>Số bản ghi: </div>
            <select
              className="bg-[#f7f7f7] outline-none"
              value={rowsPerPage}
              onChange={(e) => {
                changeRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {/* <option defaultValue={rowsPerPage}>{rowsPerPage}</option> */}
              {/* <option value={1}>1</option> */}
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                changePage(currentPage - 1); // Cập nhật số trang
                setPeriodFilter((prevParams) => ({
                  ...prevParams, // Giữ lại các tham số cũ
                  page: currentPage - 2, // Cập nhật page theo currentPage - 1
                }));
              }}
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
            {salaryPeriods.length > 0 && (
              <span>
                Page {Math.min(currentPage, pageInfo.totalPage)} of{" "}
                {pageInfo.totalPage}
              </span>
            )}
            <button
              onClick={() => {
                changePage(currentPage + 1); // Cập nhật số trang
                setPeriodFilter((prevParams) => ({
                  ...prevParams, // Giữ lại các tham số cũ
                  page: currentPage, // Cập nhật page theo currentPage + 1
                }));
              }}
              disabled={currentPage === pageInfo.totalPage}
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
    </div>
  );
};

export default PaysheetPage;

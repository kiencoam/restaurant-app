"use client";
{
  /* Không có deleteSupplier API */
}
import React, { useState, useEffect, useRef } from "react";
import CreateSupplierForm from "./create-supplier-form";
import SupplierList from "./supplier-list";
import {
  getAllSuppliers,
  SupplierEntity,
} from "@/app/api-client/SupplierService";
import { PageInfo } from "@/app/api-client/PageInfo";
import { SupplierStatusEnum } from "@/app/constants/SupplierStatusEnum";

// const SampleSuppliers: SupplierEntity[] = [
//   {
//     id: 1,
//     code: "NCC0001",
//     name: "Công ty TNHH Citigo",
//     phoneNumber: "0123456789",
//     email: "citigo@hust.vn",
//     address: "Hà Nội",
//     totalDebt: 0,
//     totalCost: 1000000,
//     status: "ACTIVE",
//     note: "Lâu năm",
//   },
//   {
//     id: 2,
//     code: "NCC0002",
//     name: "Công ty Hoàng gia",
//     phoneNumber: "0123456889",
//     email: "hg@hust.vn",
//     address: "Hà Tây",
//     totalDebt: 1000000000,
//     totalCost: 0,
//     status: "INACTIVE",
//     note: "no note"
//   },
// ];

export type GetSupplierRequest = {
  page: number;
  page_size: number;
  name?: string;
  phone_number?: string;
  debt_from?: number;
  debt_to?: number;
  total_cost_from?: number;
  total_cost_to?: number;
  status?: string;
};

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState<SupplierEntity[]>([]);

  const [masterChecked, setMasterChecked] = useState(false);

  const [flyOutActions, setFlyOutActions] = useState(false);

  const [checkedRows, setCheckedRows] = useState({});

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);

  const [isNewSupplier, setIsNewSupplier] = useState(false);

  const [expandedRow, setExpandedRow] = useState(null);

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPage: null,
    totalRecord: null,
    pageSize: null,
    nextPage: null,
    previousPage: null,
  });

  const [filter, setFilter] = useState<GetSupplierRequest>({
    page: 0,
    page_size: 5,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate total pages
  const totalPages = Math.ceil(suppliers.length / rowsPerPage);

  // Get current page rows
  const startIndex = (currentPage - 1) * rowsPerPage;

  // const currentRowsSuppliers = suppliers.slice(
  //   startIndex,
  //   startIndex + rowsPerPage
  // );
  //Lọc status ở client theo từng row

  // Handle page change
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

  const isAnyRowChecked = Object.values(checkedRows).some(Boolean);

  const handlePageSizeChange = (value: number) => {
    setFilter({
      ...filter,
      page_size: value,
      page: 0,
    });
  };

  const handlePageNumberChange = (value: number) => {
    setFilter({
      ...filter,
      page: value,
    });
  };

  // console.log("filter:", filter);
  // console.log("suppliers:", suppliers)
  useEffect(() => {
    const query = Object.entries(filter)
      .map(([key, value]) => {
        if (value || key === "page") {
          return `${key}=${value}`;
        }
      })
      .join("&");

    getAllSuppliers(query).then((data) => {
      setPageInfo(data.first);
      setSuppliers(data.second);
    });
  }, [filter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    const value = e.target.value;

    const isPhoneNumber = /^[0-9]+$/.test(value);

    if (isPhoneNumber) {
      setFilter({
        ...filter,
        phone_number: value,
        name: "",
      });
    } else {
      setFilter({
        ...filter,
        name: value,
        phone_number: "",
        page: 0,
      });
    }
  };

  const handleFilterCostChange = (e, field) => {
    setCurrentPage(1);
    let newValue = e.target.value;
    if (newValue === "") {
      newValue = null;
    } else {
      newValue = Number(newValue);
    }

    setFilter({
      ...filter,
      [field]: newValue,
      page: 0,
    });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter({
      ...filter,
      status: value,
      page: 0,
    });
  };

  const handleRowClick = (id: any) => {
    if (expandedRow === id) {
      setExpandedRow(null); // Collapse the row if it's already expanded
    } else {
      setExpandedRow(id); // Expand the clicked row
    }
  };

  const toggleFilterDropdown = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const toggleNewSupplier = () => {
    setIsNewSupplier((prev) => !prev);
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
    suppliers.forEach((supplier) => {
      updatedCheckedRows[supplier.id] = newMasterChecked;
    });
    setCheckedRows(updatedCheckedRows);
  };

  useEffect(() => {
    // Sync master checkbox with individual row checkboxes
    const allChecked = suppliers.every((supplier) => checkedRows[supplier.id]);
    setMasterChecked(allChecked);
  }, [checkedRows]);

  const handleRowCheckboxChange = (id) => {
    const updatedCheckedRows = {
      ...checkedRows,
      [id]: !checkedRows[id],
    };
    setCheckedRows(updatedCheckedRows);
  };

  return (
    <div className="w-full h-screen font-nunito bg-[#f7f7f7]">
      <div className="flex p-6 justify-between items-center">
        <div className="text-2xl font-extrabold">Nhà cung cấp</div>
        <div className="flex items-center gap-2">
          {/* Không có deleteSupplier API */}
          {/* 
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

              {flyOutActions && (
                <ul className="origin-top-right absolute top-full left-1/2 -translate-x-1/2 w-[120px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl">
                  <li>
                    <button className="text-slate-800 text-center w-[100px] hover:bg-slate-50 p-2">
                      Xóa
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )} */}
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
              className="p-2 bg-transparent outline-none"
              type="text"
              placeholder="Theo tên, điện thoại"
              value={filter.name || filter.phone_number}
              onChange={handleSearchChange}
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
                  <p className="font-bold m-2 px-2">Tổng mua</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <div className="w-8">Từ</div>
                    <input
                      type="text"
                      className="form-input border-b-2 focus:border-b-black w-3/4 outline-none"
                      placeholder="0"
                      value={filter.total_cost_from}
                      onChange={(e) =>
                        handleFilterCostChange(e, "total_cost_from")
                      }
                    />
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <div className="w-8">Đến</div>
                    <input
                      type="text"
                      className="form-input border-b-2 ml-2 focus:border-b-black w-3/4 outline-none"
                      placeholder="9999999999"
                      value={filter.total_cost_to}
                      onChange={(e) =>
                        handleFilterCostChange(e, "total_cost_to")
                      }
                    />
                  </label>
                </div>
                <div className="p-2">
                  <p className="font-bold m-2 px-2">Nợ</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <div className="w-8">Từ</div>
                    <input
                      type="text"
                      className="form-input border-b-2 focus:border-b-black w-3/4 outline-none"
                      placeholder="0"
                      value={filter.debt_from}
                      onChange={(e) => handleFilterCostChange(e, "debt_from")}
                    />
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <div className="w-8">Đến</div>
                    <input
                      type="text"
                      className="form-input border-b-2 ml-2 focus:border-b-black w-3/4 outline-none"
                      placeholder="9999999999"
                      value={filter.debt_to}
                      onChange={(e) => handleFilterCostChange(e, "debt_to")}
                    />
                  </label>
                </div>
                <div className="p-2">
                  <p className="font-bold m-2 px-2">Trạng thái</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="radio"
                      className="form-radio"
                      name="status"
                      value=""
                      checked={filter.status === ""} // Đảm bảo chọn đúng giá trị mặc định
                      onChange={handleStatusChange}
                    />
                    <span>Tất cả</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="radio"
                      className="form-radio"
                      name="status"
                      value={SupplierStatusEnum.Active}
                      checked={filter.status === SupplierStatusEnum.Active} // Kiểm tra giá trị để chọn radio đúng
                      onChange={handleStatusChange}
                    />
                    <span>Đang hoạt động</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="radio"
                      className="form-radio"
                      name="status"
                      value={SupplierStatusEnum.Inactive}
                      checked={filter.status === SupplierStatusEnum.Inactive} // Kiểm tra giá trị để chọn radio đúng
                      onChange={handleStatusChange}
                    />
                    <span>Ngừng hoạt động</span>
                  </label>
                </div>
              </div>
            )}
          </div>
          <button
            className="flex items-center border rounded-md px-2 shadow-sm bg-black"
            onClick={() => setIsNewSupplier(!isNewSupplier)}
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
            <div className="p-2 text-sm font-bold text-white">Nhà cung cấp</div>
          </button>
          {isNewSupplier && (
            <CreateSupplierForm
              setSuppliers={setSuppliers}
              toggleNewSupplier={toggleNewSupplier}
              pageSize={pageInfo.pageSize}
              setFilter={setFilter}
            />
          )}
        </div>
      </div>
      <div className="px-6">
        <SupplierList
          suppliers={suppliers}
          masterChecked={masterChecked}
          pageInfo={pageInfo}
          setSuppliers={setSuppliers}
          checkedRows={checkedRows}
          handleMasterCheckboxChange={handleMasterCheckboxChange}
          handleRowCheckboxChange={handleRowCheckboxChange}
          handleRowClick={handleRowClick}
          expandedRow={expandedRow}
          handlePageSizeChange={handlePageSizeChange}
          handlePageNumberChange={handlePageNumberChange}
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
                setFilter((prevParams) => ({
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
            {suppliers.length > 0 && (
              <span>
                Page {Math.min(currentPage, pageInfo.totalPage)} of{" "}
                {pageInfo.totalPage}
              </span>
            )}
            <button
              onClick={() => {
                changePage(currentPage + 1); // Cập nhật số trang
                setFilter((prevParams) => ({
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

export default SupplierPage;

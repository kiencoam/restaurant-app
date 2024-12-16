"use client";
import React, { useState, useEffect, useRef } from "react";
import CreateCustomerForm from "./create-customer-form";
import CustomerList from "./customer-list";
import DatePicker from "react-datepicker";
//Pick date n nhận n - 1
import "react-datepicker/dist/react-datepicker.css";
import {
  CustomerEntity,
  getAllCustomers,
  deleteCustomer,
} from "@/app/api-client/CustomerService";
import { PageInfo } from "@/app/api-client/PageInfo";
import { DeleteModal } from "../../../components/DeleteModal";

const initCustomers: CustomerEntity[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phoneNumber: "0123456789",
    email: "nguyenvana@gmail.com",
    address: "Hà Nội",
    dob: "1990-01-01",
    gender: "male",
    totalCost: "1000000",
    note: "hay bung tien",
  },
  {
    id: 6,
    name: "Nguyễn Văn An",
    phoneNumber: "0123456789",
    email: "nguyenvana@gmail.com",
    address: "Hà Nội",
    dob: "1990-01-01",
    gender: "male",
    totalCost: "1000000",
  },
  {
    id: 7,
    name: "Nguyễn Văn Anh",
    phoneNumber: "0123456789",
    email: "nguyenvana@gmail.com",
    address: "Hà Nội",
    dob: "1990-01-01",
    gender: "male",
    totalCost: "1000000",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    phoneNumber: "0123456789",
    email: "",
  },
  {
    id: 3,
    name: "Nguyễn Văn C",
    phoneNumber: "0123456789",
    email: "",
  },
  {
    id: 4,
    name: "Nguyễn Văn D",
    phoneNumber: "0123456789",
  },
  {
    id: 5,
    name: "Nguyễn Văn E",
    phoneNumber: "0123456789",
  },
];

export type GetCustomerRequest = {
  page: number;
  page_size: number;
  name?: string;
  phone_number?: string;
  address?: string;
  gender?: string;
  begin_total_cost?: number;
  end_total_cost?: number;
  begin_dob?: string;
  end_dob?: string;
};

const CustomerManagementPage = () => {
  const [customers, setCustomers] = useState<CustomerEntity[]>([]);

  const [deleteModal, setDeleteModal] = useState(false);

  const [masterChecked, setMasterChecked] = useState(false);

  const [flyOutActions, setFlyOutActions] = useState(false);

  const [checkedRows, setCheckedRows] = useState({});

  const isAnyRowChecked = Object.values(checkedRows).some(Boolean);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);

  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const [expandedRow, setExpandedRow] = useState(null);

  const [startDate, setStartDate] = useState(new Date("2004/01/01"));

  const [endDate, setEndDate] = useState(new Date("2025/12/31"));

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPage: null,
    totalRecord: null,
    pageSize: null,
    nextPage: null,
    previousPage: null,
  });

  const [filter, setFilter] = useState<GetCustomerRequest>({
    page: 0,
    page_size: 5,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Get current page rows
  const startIndex = (currentPage - 1) * rowsPerPage;

  // Handle page change
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= pageInfo.totalPage) {
      setCurrentPage(newPage);
      handlePageNumberChange(newPage - 1);
    }
  };

  const changeRowsPerPage = (pageSize) => {
    setRowsPerPage(pageSize);
    handlePageSizeChange(pageSize);
  };

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

  // console.log("filter", filter);

  useEffect(() => {
    const query = Object.entries(filter)
      .map(([key, value]) => {
        if (value) {
          return `${key}=${value}`;
        }
      })
      .join("&");
    console.log(query);
    getAllCustomers(query).then((data) => {
      setPageInfo(data.first);
      setCustomers(data.second);
    });
    // console.log(query)
  }, [filter]);

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

  const toggleNewCustomer = () => {
    setIsNewCustomer((prev) => !prev);
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
    customers.forEach((customer) => {
      updatedCheckedRows[customer.id] = newMasterChecked;
    });
    setCheckedRows(updatedCheckedRows);
  };

  useEffect(() => {
    // Sync master checkbox with individual row checkboxes
    const allChecked = customers.every((customer) => checkedRows[customer.id]);
    setMasterChecked(allChecked);
  }, [checkedRows]);

  const handleRowCheckboxChange = (id) => {
    const updatedCheckedRows = {
      ...checkedRows,
      [id]: !checkedRows[id],
    };
    setCheckedRows(updatedCheckedRows);
  };

  const handleDeleteCustomer = () => {
    const selectedIds = Object.keys(checkedRows)
      .filter((id) => checkedRows[id])
      .map((id) => Number(id));
    console.log(selectedIds);

    if (selectedIds.length === 0) {
      alert("Không có khách hàng nào được chọn để xóa.");
      return;
    }
    // Call API deleteCustomers
    Promise.all(selectedIds.map((id) => deleteCustomer(id)))
      .then(() => {
        // alert("Xóa thành công!");
        const newCheckedRows = { ...checkedRows };
        selectedIds.forEach((id) => {
          delete newCheckedRows[id];
        });
        setCheckedRows(newCheckedRows);
        setFilter((prev) => ({ ...prev })); // Kích hoạt useEffect
      })
      .catch((error) => {
        alert("Có lỗi khi xóa khách hàng.");
        console.error(error);
      });
    setDeleteModal(false);
  };

  const handleStartDateChange = (date) => {
    setFilter({
      ...filter,
      begin_dob: date.toISOString().split("T")[0],
    });
  };

  const handleEndDateChange = (date) => {
    setFilter({
      ...filter,
      end_dob: date.toISOString().split("T")[0],
    });
  };

  return (
    <div className="w-full h-screen font-nunito bg-[#f7f7f7]">
      <div className="flex p-6 justify-between items-center">
        <div className="text-2xl font-extrabold">Khách hàng</div>
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
              type="khách hàng"
              isOpen={deleteModal}
              onClose={() => setDeleteModal(false)}
              onDelete={handleDeleteCustomer}
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
              className="p-2 bg-transparent outline-none"
              type="text"
              placeholder="Theo diện thoại"
              value={filter.phone_number}
              onChange={(e) => {
                setCurrentPage(1);
                setFilter({ ...filter, phone_number: e.target.value, page: 0 });
              }}
            />
          </div>
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
              placeholder="Theo tên"
              value={filter.name}
              onChange={(e) => {
                setCurrentPage(1);
                setFilter({ ...filter, name: e.target.value, page: 0 });
              }}
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
                  <p className="font-bold m-2 px-2">Sinh nhật</p>
                  <label className="flex items-center space-x-4 mt-2">
                    <div className="min-w-[30px]">Từ</div>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      className="border-b-2 focus:border-b-black w-full outline-none"
                      selected={startDate}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={startDate}
                      value={filter.begin_dob}
                    />
                  </label>
                  <label className="flex items-center space-x-4 mt-2">
                    <div className="min-w-[30px]">Đến</div>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      className="border-b-2 focus:border-b-black w-full outline-none"
                      selected={endDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      endDate={endDate}
                      minDate={startDate}
                      value={filter.end_dob}
                    />
                  </label>
                </div>
                <div className="p-2">
                  <p className="font-bold ml-2 px-2">Tổng bán</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      className="form-input border-b-2 focus:border-b-black w-full outline-none"
                      placeholder="0"
                      value={filter.begin_total_cost}
                      onChange={(e) =>
                        handleFilterCostChange(e, "begin_total_cost")
                      }
                    />
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      className="form-input border-b-2 focus:border-b-black w-full outline-none"
                      placeholder="9999999999"
                      value={filter.end_total_cost}
                      onChange={(e) =>
                        handleFilterCostChange(e, "end_total_cost")
                      }
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
          <button
            className="flex items-center border rounded-md px-2 shadow-sm bg-black"
            onClick={() => setIsNewCustomer(!isNewCustomer)}
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
            <div className="p-2 text-sm font-bold text-white">Khách hàng</div>
          </button>
          {isNewCustomer && (
            <CreateCustomerForm
              pageSize={pageInfo.pageSize}
              setCustomers={setCustomers}
              toggleNewCustomer={toggleNewCustomer}
              setFilter={setFilter}
            />
          )}
        </div>
      </div>
      <div className="px-6">
        <CustomerList
          customers={customers}
          pageInfo={pageInfo}
          setCustomers={setCustomers}
          masterChecked={masterChecked}
          checkedRows={checkedRows}
          handleMasterCheckboxChange={handleMasterCheckboxChange}
          handleRowCheckboxChange={handleRowCheckboxChange}
          handleRowClick={handleRowClick}
          expandedRow={expandedRow}
          handlePageSizeChange={handlePageSizeChange}
          handlePageNumberChange={handlePageNumberChange}
        />
      </div>
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
          {customers.length > 0 && (
            <span>
              Page {Math.min(currentPage, pageInfo.totalPage)} of{" "}
              {pageInfo.totalPage}
            </span>
          )}
          <button
            onClick={() => changePage(currentPage + 1)}
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
  );
};

export default CustomerManagementPage;

"use client";
import React, { useState, useRef, useEffect } from "react";
import { OrderEntity, OrderItemEntity, OrderTableEntity, TableEntity } from "../order-taking/entity";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BillList from "./bill-list";
import { PageInfo } from "@/app/api-client/PageInfo";
import { formatDateToString } from "@/utils/timeUtils";
import { getAllOrders } from "@/app/api-client/OrderService";

export type GetOrderRequest = {
  page?: number;
  page_size?: number;
  order_status?: string[];
  start_time: string;
  end_time: string;
  payment_method?: string;
  table_ids?: number[];
  user_name?: string;
  customer_name?: string;
  note?: string;
};

const BillPage = () => {
  const [orders, setOrders] = useState<OrderEntity[]>([]);

  const [masterChecked, setMasterChecked] = useState(false);

  const [isNewPaysheet, setIsNewPaysheet] = useState(false);

  const [checkedRows, setCheckedRows] = useState({});

  const [flyOutActions, setFlyOutActions] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);

  const [expandedRow, setExpandedRow] = useState(null);

  const [startDate, setStartDate] = useState(new Date("2014/01/01"));

  const [endDate, setEndDate] = useState(new Date("2025/12/31"));

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPage: null,
    totalRecord: null,
    pageSize: null,
    nextPage: null,
    previousPage: null,
  });

  const [filter, setFilter] = useState<GetOrderRequest>({
    page: 0,
    page_size: 5,
    start_time: formatDateToString(startDate),
    end_time: formatDateToString(endDate),
    order_status: ["COMPLETED"],
  });

  console.log(orders);

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
    setFilter({
      ...filter,
      page_size: value,
      page: 0
    })
  }

  const handlePageNumberChange = (value: number) => {
    setFilter({
      ...filter,
      page: value
    })
  }

  const isAnyRowChecked = Object.values(checkedRows).some(Boolean);

  const handleRowClick = (id: number) => {
    if (expandedRow === id) {
      setExpandedRow(null); // Collapse the row if it's already expanded
    } else {
      setExpandedRow(id); // Expand the clicked row
    }
  };

  const handleMasterCheckboxChange = () => {
    const newMasterChecked = !masterChecked;
    setMasterChecked(newMasterChecked);

    const updatedCheckedRows = {};
    orders.forEach((order) => {
      updatedCheckedRows[order.id] = newMasterChecked;
    });
    setCheckedRows(updatedCheckedRows);
  };

  // useEffect(() => {
  //   // Sync master checkbox with individual row checkboxes
  //   const allChecked = initOrders.every((order) => checkedRows[order.id]);
  //   setMasterChecked(allChecked);
  // }, [checkedRows]);

  const handleRowCheckboxChange = (id) => {
    const updatedCheckedRows = {
      ...checkedRows,
      [id]: !checkedRows[id],
    };
    setCheckedRows(updatedCheckedRows);
  };

  const toggleFilterDropdown = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setCurrentPage(1);
    setFilter({
      ...filter,
      page: 0
    })
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setCurrentPage(1);
    setFilter({
      ...filter,
      page: 0
    })
  };

  useEffect(() => {
    const query = Object.entries(filter)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}=${value.join(",")}`;
        }
        if (value) {
          return `${key}=${value}`;
        }
      })
      .join("&");
    console.log(query)
    getAllOrders(query).then((data) => {
      setPageInfo(data.first);
      setOrders(data.second);
    })
    // console.log(query)
  }, [filter]);

  return (
    <div className="w-full h-screen font-nunito bg-[#f7f7f7]">
      <div className="flex p-6 justify-between items-center">
        <div className="text-2xl font-extrabold">Hóa đơn</div>
        <div className="flex items-center gap-2">
          {isAnyRowChecked && (
            <li
              className=" lg:px-8 relative flex items-center space-x-1"
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
                <span className="sr-only">Show submenu for &quot;Flyout Menu&quot;</span>
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
                    <button className="text-slate-800 text-center w-[100px] hover:bg-slate-50 p-2">
                      Xóa
                    </button>
                  </li>
                </ul>
                /* Thêm action ở đây */
              )}
            </li>
          )}
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
              placeholder="Tên, điện thoại khách hàng"
              onChange={(e) => setFilter({ ...filter, customer_name: e.target.value })}
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
                className="absolute right-[24px] mt-2 w-60 bg-white border border-gray-300 rounded-md shadow-lg divide-y-2"
              >
                <div className="p-2">
                  <p className="font-bold m-2 px-2">Thời gian</p>
                  <label className="flex items-center space-x-4 mt-2">
                    <div className="min-w-[30px]">Từ</div>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      className="border-b-2 focus:border-b-black w-full outline-none"
                      selected={startDate}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={startDate}
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
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="px-6">
        <BillList
          bills={orders}
          checkedRows={checkedRows}
          handleRowClick={handleRowClick}
          expandedRow={expandedRow}
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
                setFilter(prevParams => ({
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
            {orders.length > 0 &&
              <span>
                Page {Math.min(currentPage, pageInfo.totalPage)} of {pageInfo.totalPage}
              </span>
            }
            <button
              onClick={() => {
                changePage(currentPage + 1); // Cập nhật số trang
                setFilter(prevParams => ({
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

export default BillPage;

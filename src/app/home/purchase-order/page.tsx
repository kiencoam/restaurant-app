//khong lay duoc page info
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import PurchaseOrderTable from "./PurchaseOrderTable"
import { deleteStockHistory, getAllStockHistories, StockHistoryEntity } from "@/app/api-client/StockHistoryService";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PageInfo } from "@/app/api-client/PageInfo";

export type StockHistoryRequest = {
  page: number;
  page_size: number;
  code?: string;
  statuses?: string[];
  supplier_name?: string;
  user_name?: string;
  product_name?: string;
  note?: string;
  from_date?: Date;
  to_date?: Date;
};


const PurchaseOrderPage = () => {

  const [stockHistories, setStockHistories] = useState<StockHistoryEntity[]>([])

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchOptionsOpen, setSearchOptionsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPage: null,
    totalRecord: null,
    pageSize: null,
    nextPage: null,
    previousPage: null,
  });

  // const idList = [1, 2, 3, 4, 5, 6, 7, 8];

  // useEffect(() => {
  //   Promise.all(idList.map((id) => deleteStockHistory(id)))
  //     .then((results) => {
  //       console.log("Deleted stock histories:", results);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting stock histories:", error);
  //     });
  // }, []);
  

  const [filter, setFilter] = useState<StockHistoryRequest>({
    page: 0,
    page_size: 5,
    from_date: new Date("2004/01/01"),
    to_date: new Date("2025/12/31")
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


  useEffect(() => {
    /* Gọi API */
    const query = Object.entries(filter)
      .filter(([key, value]) => value !== undefined && value !== "")
      .map(([key, value]) => {
        if ((key === 'from_date' || key === 'to_date') && value instanceof Date) {
          value = formatDate(value);
        }
        return `${key}=${value}`;
      })
      .join("&");
    console.log(query);
    getAllStockHistories(query).then((data) => {
      console.log("data:", data)
      setPageInfo(data.first);
      /*nextPage: 1
      pageSize: 5
      previousPage: null
      totalPage: null
      totalRecord: 8 */
      setStockHistories(data.second);
    });
  }, [filter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFilter({
      ...filter,
      [field]: e.target.value,
    });
  };


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, status: string) => {
    setFilter((prev) => {
      const updatedStatuses = e.target.checked
        ? [...(prev.statuses || []), status]  // Khởi tạo mảng trống nếu statuses là undefined
        : (prev.statuses || []).filter((item) => item !== status);  // Loại bỏ status nếu chưa được chọn
      return {
        ...prev,
        statuses: updatedStatuses,
      };
    });
  };


  const handleDateChange = (date: Date | null, dateType: "from_date" | "to_date") => {
    if (date) {
      setFilter((prev) => ({
        ...prev,
        [dateType]: date,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass the filter  to the parent component or API call here
    toggleSearchOptions(); // Close the modal after submitting
    console.log(filter)
  };


  // const handleStockHistoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
  //   setGetStockHistoryRequest({
  //     ...getStockHistoryRequest,
  //     [field]: e.target.value
  //   });
  //   console.log(getStockHistoryRequest);
  // };


  const formatDate = (date: Date) => {
    if (!date) return null; // Kiểm tra đầu vào
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  };



  console.log("Stock Histories", stockHistories);

  const filterRef = useRef(null);


  // Calculate total pages
  const totalPages = Math.ceil(stockHistories.length / rowsPerPage);

  // Get current page rows
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRowsData = stockHistories.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const toggleSearchOptions = () => {
    setSearchOptionsOpen((prev) => !prev);
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

  return (
    <div className="w-full h-screen font-nunito bg-[#f7f7f7]">
      {/* Header */}
      <div className="flex p-6 pb-3 justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-extrabold">Phiếu nhập hàng</div>
        <div className="flex items-center gap-2">
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
              placeholder="Theo tên nhà cung cấp"
              value={filter.product_name}
              onChange={(e) => handleInputChange(e, "supplier_name")}
            />
            <button onClick={toggleSearchOptions}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
            </button>
            {searchOptionsOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                  <h2 className="text-xl font-bold mb-4">Search Options</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      placeholder="Theo mã phiếu đặt"
                      className="p-2 mb-2 outline-none border-b-2"
                      value={filter.code}
                      onChange={(e) => handleInputChange(e, "code")}
                    />
                    <input
                      placeholder="Theo mã, tên hàng"
                      className="p-2 mb-2 outline-none border-b-2"
                      value={filter.product_name}
                      onChange={(e) => handleInputChange(e, "product_name")}
                    />
                    <input
                      placeholder="Theo mã, tên NCC"
                      className="p-2 mb-2 outline-none border-b-2"
                      value={filter.supplier_name}
                      onChange={(e) => handleInputChange(e, "supplier_name")}
                    ></input>
                    <input
                      placeholder="Theo ghi chú"
                      className="p-2 mb-2 outline-none border-b-2"
                      value={filter.note}
                      onChange={(e) => handleInputChange(e, "note")}
                    />
                    <input
                      placeholder="Theo người nhập"
                      className="p-2 mb-2 outline-none border-b-2"
                      value={filter.user_name}
                      onChange={(e) => handleInputChange(e, "user_name")}
                    ></input>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="p-2 bg-black text-white rounded mb-2"
                      >
                        Tìm kiếm
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded mb-2"
                        onClick={toggleSearchOptions}
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
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
                    <label className="flex items-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={filter.statuses && filter.statuses.includes("PENDING")}
                        onChange={(e) => handleCheckboxChange(e, "PENDING")}
                      />
                      <span>Phiếu tạm</span>
                    </label>
                    <label className="flex items-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={filter.statuses && filter.statuses.includes("DONE")}
                        onChange={(e) => handleCheckboxChange(e, "DONE")}
                      />
                      <span>Đã nhập hàng</span>
                    </label>
                    {/* <label className="flex items-center space-x-2 mt-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={filter.statuses && filter.statuses.includes("canceled")}
                        onChange={(e) => handleCheckboxChange(e, "canceled")}
                      />
                      <span>Đã hủy</span>
                    </label> */}
                  </div>

                  <div className="p-2">
                    <p className="font-bold m-2 px-2">Thời gian</p>
                    <label className="flex items-center space-x-4 mt-2">
                      <div className="min-w-[30px]">Từ</div>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        className="border-b-2 focus:border-b-black w-full outline-none"
                        selected={filter.from_date}
                        onChange={(date: Date | null) => handleDateChange(date, "from_date")}
                        selectsStart
                        startDate={filter.from_date}
                        endDate={filter.to_date}
                      />
                    </label>
                    <label className="flex items-center space-x-4 mt-2">
                      <div className="min-w-[30px]">Đến</div>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        className="border-b-2 focus:border-b-black w-full outline-none"
                        selected={filter.to_date}
                        onChange={(date: Date | null) => handleDateChange(date, "to_date")}
                        selectsEnd
                        startDate={filter.from_date}
                        endDate={filter.to_date}
                        minDate={filter.from_date}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Link href="/home/purchase-order/new">
            <button className="flex items-center border rounded-md px-2 shadow-sm bg-black">
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
              <div className="p-2 text-sm font-bold text-white">Nhập hàng</div>
            </button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <PurchaseOrderTable
          data={currentRowsData}
          setFilter={setFilter}
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
            {stockHistories.length > 0 &&
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

export default PurchaseOrderPage;
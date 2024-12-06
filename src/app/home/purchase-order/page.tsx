"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import PurchaseOrderTable from "./PurchaseOrderTable"
import PurchaseOrderFilter from "./PurchaseOrderFilter";
import { getAllStockHistories, StockHistoryEntity } from "@/app/api-client/StockHistoryService";
import dayjs from "dayjs";

const PurchaseOrderPage = () => {
  const [stockHistories, setStockHistories] = useState<StockHistoryEntity[]>([])
  const [pageSize, setpageSize] = useState(5); // Default to showing 5 rows

  const [expandedRows, setExpandedRows] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchOptionsOpen, setSearchOptionsOpen] = useState(false);
  const [getStockHistoryRequest, setGetStockHistoryRequest] = useState({
    page: 0,
    pageSize: 15,
    code: "",
    statuses: [],
    supplierName: "",
    userName: "",
    productName: "",
    note: "",
    fromDate: "",
    toDate: "",
  });


  const handleStockHistoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setGetStockHistoryRequest({
      ...getStockHistoryRequest,
      [field]: e.target.value
    });
    console.log(getStockHistoryRequest);
  };


  const formatDate = (date: string) => {
    if (!date) return null;
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  };

  const buildQueryParams = useCallback(() => {
    let queryParams = `page=${getStockHistoryRequest.page}&page_size=${getStockHistoryRequest.pageSize}`;

    // Check and add optional filters to the query string
    if (getStockHistoryRequest.code.trim() !== "") {
      queryParams = queryParams.concat(`&code=${getStockHistoryRequest.code}`);
    }
    if (getStockHistoryRequest.statuses && getStockHistoryRequest.statuses.length > 0) {
      queryParams = queryParams.concat(`&statuses=${getStockHistoryRequest.statuses.join(',')}`);
    }
    if (getStockHistoryRequest.supplierName.trim() !== "") {
      queryParams = queryParams.concat(`&supplier_name=${getStockHistoryRequest.supplierName}`);
    }
    if (getStockHistoryRequest.userName.trim() !== "") {
      queryParams = queryParams.concat(`&user_name=${getStockHistoryRequest.userName}`);
    }
    if (getStockHistoryRequest.productName.trim() !== "") {
      queryParams = queryParams.concat(`&product_name=${getStockHistoryRequest.productName}`);
    }
    if (getStockHistoryRequest.note.trim() !== "") {
      queryParams = queryParams.concat(`&note=${getStockHistoryRequest.note}`);
    }
    if (getStockHistoryRequest.fromDate) {
      queryParams = queryParams.concat(`&from_date=${formatDate(getStockHistoryRequest.fromDate)}`);
    }

    if (getStockHistoryRequest.toDate) {
      queryParams = queryParams.concat(`&to_date=${formatDate(getStockHistoryRequest.toDate)}`);
    }

    return queryParams;
  }, [getStockHistoryRequest])


  useEffect(() => {
    const fecthStockHistories = (queryParams) => {
      getAllStockHistories(queryParams).then(res => setStockHistories(res.second))
    }

    fecthStockHistories(buildQueryParams())

  }, [buildQueryParams])


  console.log("Stock Histories", stockHistories);
  const filterRef = useRef(null);
  // Hàm xử lý thay đổi bộ lọc
  const handleFilterChange = (updatedFilters) => {
    setGetStockHistoryRequest((prevState) => ({
      ...prevState,
      ...updatedFilters,
    }));
  };
  // // Toggle row expansion
  // const toggleRowExpansion = (code) => {
  //   setExpandedRows((prev) => ({
  //     ...prev,
  //     [code]: !prev[code],
  //   }));
  // };

  const handleRowClick = (code) => {
    if (expandedRows === code) {
      setExpandedRows(null); // Collapse the row if it's already expanded
    } else {
      setExpandedRows(code); // Expand the clicked row
    }
  };

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
          <PurchaseOrderFilter
            isFilterOpen={isFilterOpen}
            toggleFilterDropdown={toggleFilterDropdown}
            filterRef={filterRef}
            searchOptionsOpen={searchOptionsOpen}
            handleSearchOptionOpen={() => setSearchOptionsOpen(!searchOptionsOpen)}
            toggleSearchOptions={toggleSearchOptions}
            handleFilterChange={handleFilterChange} // Truyền hàm xử lý thay đổi bộ lọc
          />

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
          data={stockHistories}
          expandedRows={expandedRows}
          handleRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

export default PurchaseOrderPage;

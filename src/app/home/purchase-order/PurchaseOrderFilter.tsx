import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PurchaseOrderFilter = ({
  isFilterOpen,
  toggleFilterDropdown,
  filterRef,
  searchOptionsOpen,
  handleSearchOptionOpen,
  toggleSearchOptions,
  handleFilterChange, // Passing function to handle changes in filter state
}) => {
  const [filterValues, setFilterValues] = useState({
    code: "",
    supplierName: "",
    productName: "",
    note: "",
    userName: "",
    fromDate: new Date("2014/01/01"),
    toDate: new Date("2025/12/31"),
    statuses: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFilterValues({
      ...filterValues,
      [field]: e.target.value,
    });
  };


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, status: string) => {
    setFilterValues((prev) => {
      const updatedStatuses = e.target.checked
        ? [...prev.statuses, status]
        : prev.statuses.filter((item) => item !== status);
      return {
        ...prev,
        statuses: updatedStatuses,
      };
    });
  };

  const handleDateChange = (date: Date | null, dateType: "fromDate" | "toDate") => {
    if (date) {
      setFilterValues((prev) => ({
        ...prev,
        [dateType]: date,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass the filter values to the parent component or API call here
    handleFilterChange(filterValues);
    toggleSearchOptions(); // Close the modal after submitting
    console.log(filterValues)
  };

  return (
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
        placeholder="Theo tên NCC, tên hàng"
        value={filterValues.supplierName}
        onChange={(e) => handleInputChange(e, "supplierName")}
      />
      <button onClick={handleSearchOptionOpen}>
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
                value={filterValues.code}
                onChange={(e) => handleInputChange(e, "code")}
              />
              <input
                placeholder="Theo mã, tên hàng"
                className="p-2 mb-2 outline-none border-b-2"
                value={filterValues.productName}
                onChange={(e) => handleInputChange(e, "productName")}
              />
              <input
                placeholder="Theo mã, tên NCC"
                className="p-2 mb-2 outline-none border-b-2"
                value={filterValues.supplierName}
                onChange={(e) => handleInputChange(e, "supplierName")}
              ></input>
              <input
                placeholder="Theo ghi chú"
                className="p-2 mb-2 outline-none border-b-2"
                value={filterValues.note}
                onChange={(e) => handleInputChange(e, "note")}
              />
              <input
                placeholder="Theo người nhập"
                className="p-2 mb-2 outline-none border-b-2"
                value={filterValues.userName}
                onChange={(e) => handleInputChange(e, "userName")}
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
                  checked={filterValues.statuses.includes("pending")}
                  onChange={(e) => handleCheckboxChange(e, "pending")}
                />
                <span>Phiếu tạm</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={filterValues.statuses.includes("completed")}
                  onChange={(e) => handleCheckboxChange(e, "completed")}
                />
                <span>Đã nhập hàng</span>
              </label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={filterValues.statuses.includes("canceled")}
                  onChange={(e) => handleCheckboxChange(e, "canceled")}
                />
                <span>Đã hủy</span>
              </label>
            </div>

            <div className="p-2">
              <p className="font-bold m-2 px-2">Thời gian</p>
              <label className="flex items-center space-x-4 mt-2">
                <div className="min-w-[30px]">Từ</div>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  className="border-b-2 focus:border-b-black w-full outline-none"
                  selected={filterValues.fromDate}
                  onChange={(date: Date | null) => handleDateChange(date, "fromDate")}
                  selectsStart
                  startDate={filterValues.fromDate}
                  endDate={filterValues.toDate}
                />
              </label>
              <label className="flex items-center space-x-4 mt-2">
                <div className="min-w-[30px]">Đến</div>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  className="border-b-2 focus:border-b-black w-full outline-none"
                  selected={filterValues.toDate}
                  onChange={(date: Date | null) => handleDateChange(date, "toDate")}
                  selectsEnd
                  startDate={filterValues.fromDate}
                  endDate={filterValues.toDate}
                  minDate={filterValues.fromDate}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseOrderFilter;

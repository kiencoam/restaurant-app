"use client";
import React, { useState, useEffect, useRef } from "react";
import { SupplierEntity } from "./data";
import CreateSupplierForm from "./create-supplier-form";
import SupplierList from "./supplier-list";

const suppliers: SupplierEntity[] = [
  {
    id: 1,
    code: "NCC0001",
    name: "Công ty TNHH Citigo",
    phoneNumber: "0123456789",
    email: "citigo@hust.vn",
    address: "Hà Nội",
    totalDebt: 0,
    totalCost: 1000000,
    status: "ACTIVE",
    note: "Lâu năm",
  },
  {
    id: 2,
    code: "NCC0002",
    name: "Công ty Hoàng gia",
    phoneNumber: "0123456889",
    email: "hg@hust.vn",
    address: "Hà Tây",
    totalDebt: 1000000000,
    totalCost: 0,
    status: "INACTIVE",
  },
];

const SupplierPage = () => {
  const [masterChecked, setMasterChecked] = useState(false);
  const [newSupplier, setNewSupplier] = useState<SupplierEntity>();
  const [flyOutActions, setFlyOutActions] = useState(false);
  const [checkedRows, setCheckedRows] = useState({});
  const isAnyRowChecked = Object.values(checkedRows).some(Boolean);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const [isNewSupplier, setIsNewSupplier] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (id) => {
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
          {isAnyRowChecked && (
            <li
              className="p-4 lg:px-8 relative flex items-center space-x-1"
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
                <span className="sr-only">Show submenu for "Flyout Menu"</span>
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
              className="p-2 bg-transparent outline-none"
              type="text"
              placeholder="Theo tên, điện thoại"
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
                    />
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <div className="w-8">Đến</div>
                    <input
                      type="text"
                      className="form-input border-b-2 ml-2 focus:border-b-black w-3/4 outline-none"
                      placeholder="9999999999"
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
                    />
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <div className="w-8">Đến</div>
                    <input
                      type="text"
                      className="form-input border-b-2 ml-2 focus:border-b-black w-3/4 outline-none"
                      placeholder="9999999999"
                    />
                  </label>
                </div>
                <div className="p-2">
                  <p className="font-bold m-2 px-2">Trạng thái</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="radio" className="form-radio" name ="status"/>
                    <span>Tất cả</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="radio" className="form-radio" name ="status"/>
                    <span>Đang hoạt động</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="radio" className="form-radio" name ="status"/>
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
                newSupplier={newSupplier}
                setNewSupplier={setNewSupplier}
                toggleNewSupplier={toggleNewSupplier}
              />
            )}
        </div>
      </div>    
      <div className="px-6">
        <SupplierList
          suppliers={suppliers}
          masterChecked={masterChecked}
          checkedRows={checkedRows}
          handleMasterCheckboxChange={handleMasterCheckboxChange}
          handleRowCheckboxChange={handleRowCheckboxChange}
          handleRowClick = {handleRowClick}
          expandedRow = {expandedRow}
        />
      </div>
    </div>
  );
};

export default SupplierPage;

"use client";
import React, { useEffect, useRef, useState } from "react";
import { TableEntity } from "../order-taking/entity";
import CreateTableForm from "./create-table-form";
import TableList from "./table-list";

const tables: TableEntity[] = [
    {
      id: 1,
      name: "Bàn 1",
      capacity: 4,
      type: "NORMAL",
      location: "Tầng 1",
      isActive: true,
    },
    {
      id: 2,
      name: "Bàn 2",
      capacity: 4,
      type: "NORMAL",
      location: "Tầng 2",
      isActive: true,
    },
    {
      id: 3,
      name: "Bàn 3",
      capacity: 4,
      type: "NORMAL",
      location: "Tầng 3",
      isActive: true,
    },
    {
      id: 4,
      name: "Bàn 4",
      capacity: 4,
      type: "NORMAL",
      location: "Tầng 1",
      isActive: true,
    },
    {
      id: 5,
      name: "Bàn 5",
      capacity: 4,
      type: "NORMAL",
      location: "Tầng 2",
      isActive: true,
    },
    {
      id: 6,
      name: "Bàn 6",
      capacity: 4,
      type: "NORMAL",
      location: "Tầng 3",
      isActive: true,
    },
    {
      id: 7,
      name: "Phòng VIP 1",
      capacity: 4,
      type: "NORMAL",
      location: "VIP 1",
      isActive: true,
    },
    {
      id: 8,
      name: "Phòng VIP 2",
      capacity: 4,
      type: "NORMAL",
      location: "VIP 2",
      isActive: true,
    },
    {
      id: 9,
      name: "Bàn 9",
      capacity: 4,
      type: "NORMAL",
      location: "Tầng 1",
      isActive: true,
    },
    {
      id: 10,
      name: "Bàn 10",
      capacity: 4,
      type: "NORMAL",
      location: "Tầng 2",
      isActive: true,
    },
  ];

const TableAndRoomPage = () => {
  const [newTable, setNewTable] = useState<TableEntity>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const [isNewTable, setIsNewTable] = useState(false);
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

  const toggleNewTable = () => {
    setIsNewTable((prev) => !prev);
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
    <div className="w-full min-h-screen h-full font-nunito bg-[#f7f7f7]">
      <div className="flex p-6 justify-between items-center">
        <div className="text-2xl font-extrabold">Phòng/Bàn</div>
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
              placeholder="Theo tên phòng/bàn"
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
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="radio" className="form-radio" name="status" />
                    <span>Tất cả</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="radio" className="form-radio" name="status" />
                    <span>Đang hoạt động</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="radio" className="form-radio" name="status" />
                    <span>Ngừng hoạt động</span>
                  </label>
                </div>
              </div>
            )}
          </div>
          <button
            className="flex items-center border rounded-md px-2 shadow-sm bg-black"
            onClick={() => setIsNewTable(!isNewTable)}
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
            <div className="p-2 text-sm font-bold text-white">Phòng/bàn</div>
          </button>
          {isNewTable && (
              <CreateTableForm
                newTable={newTable}
                setNewTable={setNewTable}
                toggleNewTable={toggleNewTable}
              />
            )}
        </div>
      </div>
      <div className="px-6">
        <TableList
          tables={tables}
          handleRowClick = {handleRowClick}
          expandedRow = {expandedRow}
        />
      </div>
    </div>
  );
};

export default TableAndRoomPage;

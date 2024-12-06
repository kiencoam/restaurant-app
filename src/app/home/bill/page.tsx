"use client";
import React, { useState, useRef, useEffect } from "react";
import { OrderEntity, OrderItemEntity, OrderTableEntity, TableEntity } from "../order-taking/entity";
import { CustomerEntity} from "./data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BillList from "./bill-list";

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

const initOrders: OrderEntity[] = [
  {
    id: 1,
    customerId: 1,
    userId: 1,
    orderStatus: "CONFIRMED",
    totalCost: 125000,
    numberOfPeople: 2,
    note: "Không ớt",
    checkInTime: "2024-04-01T12:00:00",
    checkOutTime: "2024-04-01T13:00:00",
    paymentId: 1,
    totalPrice: 12500,
    promotion: 0,
    needToPay: 12500,
    paymentMethod: "CASH",
    orderItems: [
      {
        id: 1,
        orderId: 1,
        menuItemId: 1,
        orderedQuantity: 3,
        reservedQuantity: 0,
        price: 125000,
        status: "PROCESSING",
      },
      {
        id: 2,
        orderId: 1,
        menuItemId: 2,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 12000,
        status: "PROCESSING",
      },
      {
        id: 3,
        orderId: 1,
        menuItemId: 3,
        orderedQuantity: 2,
        reservedQuantity: 1,
        price: 1200000,
        status: "PROCESSING",
      },
    ],
    orderTables: [
      {
        id: 1,
        orderId: 1,
        tableId: 1,
      },
    ],
  },
  {
    id: 2,
    customerId: 2,
    userId: 2,
    orderStatus: "CHECKED_IN",
    totalCost: 125000,
    numberOfPeople: 2,
    note: "Không ớt",
    checkInTime: "2024-04-01T12:00:00",
    checkOutTime: "2024-04-01T13:00:00",
    paymentId: 2,
    totalPrice: 12500,
    promotion: 500,
    needToPay: 12000,
    paymentMethod: "CASH",
    orderItems: [
      {
        id: 4,
        orderId: 2,
        menuItemId: 1,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 125000,
        status: "PROCESSING",
      },
      {
        id: 5,
        orderId: 2,
        menuItemId: 2,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 12000,
        status: "PROCESSING",
      },
      {
        id: 6,
        orderId: 2,
        menuItemId: 3,
        orderedQuantity: 2,
        reservedQuantity: 1,
        price: 1200000,
        status: "PROCESSING",
      },
    ],
    orderTables: [
      {
        id: 2,
        orderId: 2,
        tableId: 3,
      },
    ],
  },
  {
    id: 3,
    customerId: 3,
    userId: 3,
    orderStatus: "ABANDONED",
    totalCost: 125000,
    numberOfPeople: 2,
    note: "Không ớt",
    checkInTime: "2024-04-01T12:00:00",
    checkOutTime: "2024-04-01T13:00:00",
    paymentId: 3,
    totalPrice: 12500,
    promotion: 0,
    needToPay: 12500,
    paymentMethod: "CASH",
    orderItems: [
      {
        id: 7,
        orderId: 3,
        menuItemId: 1,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 125000,
        status: "PROCESSING",
      },
      {
        id: 8,
        orderId: 3,
        menuItemId: 2,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 12000,
        status: "PROCESSING",
      },
      {
        id: 9,
        orderId: 3,
        menuItemId: 3,
        orderedQuantity: 2,
        reservedQuantity: 1,
        price: 1200000,
        status: "PROCESSING",
      },
    ],
    orderTables: [
      {
        id: 3,
        orderId: 3,
        tableId: 5,
      },
    ],
  },
  {
    id: 4,
    customerId: 4,
    userId: 4,
    orderStatus: "CANCELLED",
    totalCost: 125000,
    numberOfPeople: 2,
    note: "Không ớt",
    checkInTime: "2024-04-01T12:00:00",
    checkOutTime: "2024-04-01T13:00:00",
    paymentId: 4,
    totalPrice: 12500,
    promotion: 0,
    needToPay: 12500,
    paymentMethod: "CASH",
    orderItems: [
      {
        id: 10,
        orderId: 4,
        menuItemId: 1,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 125000,
        status: "PROCESSING",
      },
      {
        id: 11,
        orderId: 4,
        menuItemId: 2,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 12000,
        status: "PROCESSING",
      },
      {
        id: 12,
        orderId: 4,
        menuItemId: 3,
        orderedQuantity: 2,
        reservedQuantity: 1,
        price: 1200000,
        status: "PROCESSING",
      },
    ],
    orderTables: [
      {
        id: 4,
        orderId: 4,
        tableId: 7,
      },
    ],
  },
  {
    id: 5,
    customerId: 5,
    userId: 5,
    orderStatus: "COMPLETED",
    totalCost: 125000,
    numberOfPeople: 2,
    note: "Không ớt",
    checkInTime: "2024-04-01T12:00:00",
    checkOutTime: "2024-04-01T13:00:00",
    paymentId: 5,
    totalPrice: 12500,
    promotion: 0,
    needToPay: 12500,
    paymentMethod: "CASH",
    orderItems: [
      {
        id: 13,
        orderId: 5,
        menuItemId: 1,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 125000,
        status: "PROCESSING",
      },
      {
        id: 14,
        orderId: 5,
        menuItemId: 2,
        orderedQuantity: 2,
        reservedQuantity: 0,
        price: 12000,
        status: "PROCESSING",
      },
      {
        id: 15,
        orderId: 5,
        menuItemId: 3,
        orderedQuantity: 2,
        reservedQuantity: 1,
        price: 1200000,
        status: "PROCESSING",
      },
    ],
    orderTables: [
      {
        id: 5,
        orderId: 5,
        tableId: 9,
      },
    ],
  },
];

const customers: CustomerEntity[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phoneNumber: "0123456789",
    email: "nguyenvana@gmail.com",
    address: "Hà Nội",
    dob: "1990-01-01",
    gender: "male",
    totalCost: "1000000",
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

const BillPage = () => {
  const [masterChecked, setMasterChecked] = useState(false);
  const [isNewPaysheet, setIsNewPaysheet] = useState(false);
  const [checkedRows, setCheckedRows] = useState({});
  const [flyOutActions, setFlyOutActions] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const [startDate, setStartDate] = useState(new Date("2014/01/01"));
  const [endDate, setEndDate] = useState(new Date("2025/12/31"));

  const isAnyRowChecked = Object.values(checkedRows).some(Boolean);

  const handleRowClick = (id) => {
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
    initOrders.forEach((order) => {
      updatedCheckedRows[order.id] = newMasterChecked;
    });
    setCheckedRows(updatedCheckedRows);
  };

  useEffect(() => {
    // Sync master checkbox with individual row checkboxes
    const allChecked = initOrders.every((ỏder) => checkedRows[ỏder.id]);
    setMasterChecked(allChecked);
  }, [checkedRows]);

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
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

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
              className="p-2 bg-transparent outline-none w-60"
              type="text"
              placeholder="Tên, điện thoại khách hàng"
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
                      endDate={endDate}
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
                      startDate={startDate}
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
          bills={initOrders}
          masterChecked={masterChecked}
          checkedRows={checkedRows}
          handleMasterCheckboxChange={handleMasterCheckboxChange}
          handleRowCheckboxChange={handleRowCheckboxChange}
          handleRowClick={handleRowClick}
          expandedRow={expandedRow}
        />
      </div>
    </div>
  );
};

export default BillPage;

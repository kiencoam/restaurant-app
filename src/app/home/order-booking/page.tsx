"use client";
import React, { useState, useEffect, useRef } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { CustomerEntity } from "./data";
import { formatDateToString } from "@/utils/timeUtils";
import { default as ReactSelect, components } from "react-select";
import OrderList from "./order-list";
import CreateOrderForm from "./create-order-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CreateOrderRequest,
  GetOrderRequest,
  OrderEntity,
  TableEntity,
} from "../order-taking/entity";

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
    paymentId: 1,
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
    paymentId: 1,
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
    paymentId: 1,
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
    paymentId: 1,
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

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const OrderBookingPage = () => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const [flyOutActions, setFlyOutActions] = useState(false);

  const [checkedRows, setCheckedRows] = useState({});

  const [masterChecked, setMasterChecked] = useState(false);

  const [searchOptionsOpen, setSearchOptionsOpen] = useState(false);

  const [filterOrder, setFilterOrder] = useState<GetOrderRequest>({
    startTime: formatDateToString(new Date()),
    endTime: formatDateToString(
      new Date(new Date().setDate(new Date().getDate() + 1))
    ),
    orderStatus: new Set(),
    tableIds: new Set(),
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isNewOrder, setIsNewOrder] = useState(false);

  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const [searchCustomer, setSearchCustomer] = useState("");

  const [newOrder, setNewOrder] = useState<CreateOrderRequest>({
    customerId: null,
    userId: null,
    checkInTime: "",
    checkOutTime: "",
    numberOfPeople: 1,
    tableIds: new Set(),
  });

  const [newCustomer, setNewCustomer] = useState<CustomerEntity>();

  const filterCustomer: CustomerEntity[] =
    searchCustomer.trim() === ""
      ? []
      : customers.filter((customer) =>
          customer.name.toLowerCase().includes(searchCustomer.toLowerCase())
        );

  //console.log("filterCustomer", filterCustomer);
  //console.log("filterOrder", filterOrder);
  //console.log("newOrder", newOrder);
  //console.log("newCustomer", newCustomer);

  const [startDate, setStartDate] = useState(new Date("2014/01/01"));
  const [endDate, setEndDate] = useState(new Date("2025/12/31"));

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleFilterOrderStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOrderStatus = new Set(filterOrder.orderStatus);
    if (e.target.checked) {
      newOrderStatus.add(e.target.value);
    } else {
      newOrderStatus.delete(e.target.value);
    }
    setFilterOrder({ ...filterOrder, orderStatus: newOrderStatus });
  };

  const filterRef = useRef(null);

  const tableOptions = tables?.map((table) => ({
    value: table.id,
    label: table.name,
  }));

  const [firstSelectValue, setFirstSelectValue] = useState([]); //choose tables and rooms next to search
  const [secondSelectValue, setSecondSelectValue] = useState([]); //choose tables and rooms in the adding new
  console.log("first", firstSelectValue);

  const handleFirstSelectTableChange = (selectedOptions) => {
    setFirstSelectValue(selectedOptions);

    const newTableIds: Set<number> = new Set();
    selectedOptions.forEach((element: { value: number }) => {
      newTableIds.add(element.value);
    });

    setFilterOrder({ ...filterOrder, tableIds: newTableIds });
  };

  const handleSecondSelectChange = (selectedOptions) => {
    setSecondSelectValue(selectedOptions);

    const newTableIds: Set<number> = new Set();
    selectedOptions.forEach((element) => {
      newTableIds.add(element.value);
    });

    setNewOrder({ ...newOrder, tableIds: newTableIds });
  };
  const DropdownIndicator = null;
  const noOptionsMessage = () => "Bàn/Phòng không có sẵn"; // Custom message
  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      borderColor: "#f7f7f7",
      padding: "0rem", // equivalent to Tailwind's p-2
      width: "30rem", // equivalent to Tailwind's w-60
      outline: "none",
      fontSize: "0.875rem", // equivalent to Tailwind's text-sm
      boxShadow: "none",
      "&:hover": {
        borderColor: "transparent", // Keeps the border color on hover as none
      },
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? "#7ab5e6" : isFocused ? "#ebf8ff" : "white",
      color: isSelected ? "white" : "#2d3748",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#ebf8ff",
        color: "#2d3748",
      },
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "#b7b7b7",
      borderRadius: "12px",
      padding: "0.25rem", // Adds padding for multi-value items
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#2d3748",
      fontSize: "0.875rem", // Tailwind text-sm equivalent
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "#2d3748",
      ":hover": {
        backgroundColor: "#e53e3e",
        color: "white",
      },
    }),
    menu: (styles) => ({
      ...styles,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    }),
    input: (styles) => ({
      ...styles,
      width: "15rem", // Tailwind w-60 equivalent
      margin: "0px",
      fontSize: "0.875rem", // Tailwind text-sm equivalent
    }),
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

  const toggleSearchOptions = () => {
    setSearchOptionsOpen((prev) => !prev);
  };

  const toggleNewCustomer = () => {
    setIsNewCustomer((prev) => !prev);
  };

  const toggleNewReservation = () => {
    setIsNewOrder((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", filterOrder);
    // Add search functionality here
  };

  const handleMasterCheckboxChange = () => {
    const newMasterChecked = !masterChecked;
    setMasterChecked(newMasterChecked);

    const updatedCheckedRows = {};
    customers.forEach((_, index) => {
      updatedCheckedRows[index] = newMasterChecked;
    });
    setCheckedRows(updatedCheckedRows);
  };

  const handleRowCheckboxChange = (index) => {
    const updatedCheckedRows = {
      ...checkedRows,
      [index]: !checkedRows[index],
    };
    setCheckedRows(updatedCheckedRows);

    // Update the master checkbox state based on individual checkboxes
    const allChecked = customers.every((_, i) => updatedCheckedRows[i]);
    setMasterChecked(allChecked);
  };

  const isAnyRowChecked = Object.values(checkedRows).some(Boolean);

  return (
    <div className="w-full h-screen font-nunito bg-[#f7f7f7] p-6">
      <div className="text-2xl font-extrabold mb-6">Đặt bàn</div>
      <div className="flex justify-between">
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
              placeholder="Theo tên khách hàng"
              onChange={(e) =>
                setFilterOrder({ ...filterOrder, customerName: e.target.value })
              }
            />
            <button onClick={() => setSearchOptionsOpen(!searchOptionsOpen)}>
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
          </div>

          {searchOptionsOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Search Options</h2>
                <form onSubmit={handleSearch}>
                  <input
                    placeholder="Tìm theo khách đặt"
                    className="p-2 mb-2 outline-none border-b-2 focus:border-b-black"
                    onChange={(e) =>
                      setFilterOrder({
                        ...filterOrder,
                        customerName: e.target.value,
                      })
                    }
                  ></input>
                  <input
                    placeholder="Theo người nhận đặt"
                    className="p-2 mb-2 outline-none border-b-2 focus:border-b-black"
                    onChange={(e) =>
                      setFilterOrder({
                        ...filterOrder,
                        userName: e.target.value,
                      })
                    }
                  ></input>
                  <div className="flex justify-between">
                    <input
                      placeholder="Theo ghi chú"
                      className="p-2 mb-2 border-b-2 focus:border-b-black outline-none"
                      onChange={(e) =>
                        setFilterOrder({ ...filterOrder, note: e.target.value })
                      }
                    ></input>
                  </div>
                  <div className="flex justify-end">
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="p-2 bg-black text-white rounded mb-2"
                        onClick={toggleSearchOptions}
                      >
                        Tìm kiếm
                      </button>
                      <button
                        className="p-2 rounded mb-2"
                        onClick={toggleSearchOptions}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="ml-2 ">
            <ReactSelect
              options={tableOptions}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option,
                DropdownIndicator,
              }}
              placeholder="Chọn phòng/bàn"
              onChange={handleFirstSelectTableChange}
              value={firstSelectValue}
              styles={customStyles}
              noOptionsMessage={noOptionsMessage}
              // Hide dropdown list  when select any item
              // closeMenuOnSelect={true}

              //Selected Item Remove in dropdown list
              // hideSelectedOptions={true}
            />
          </div>
        </div>
        <div className="flex gap-4 justify-end">
          {isAnyRowChecked && (
            <li
              className="relative flex items-center space-x-1"
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
                {/* <span className="sr-only">Show submenu for "Flyout Menu"</span> */}
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
                      Nhận bàn
                    </button>
                  </li>
                  <li>
                    <button className="text-slate-800 text-center w-[100px] hover:bg-slate-50 p-2">
                      Hủy đặt
                    </button>
                  </li>
                </ul>
                /* Thêm action ở đây */
              )}
            </li>
          )}
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
              className="absolute mt-2 w-48 top-32 right-[51.23px] bg-white border border-gray-300 rounded-md shadow-lg divide-y-2"
            >
              <div className="p-2">
                <p className="font-bold ml-2 px-2">Tình trạng</p>
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    value={"CONFIRMED"}
                    onChange={handleFilterOrderStatusChange}
                  />
                  <span>Đã xếp bàn</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    value={"CHECKED_IN"}
                    onChange={handleFilterOrderStatusChange}
                  />
                  <span>Đã nhận bàn</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    value={"ABANDONED"}
                    onChange={handleFilterOrderStatusChange}
                  />
                  <span>Đến muộn</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    value={"CANCELLED"}
                    onChange={handleFilterOrderStatusChange}
                  />
                  <span>Đã hủy</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    value={"COMPLETED"}
                    onChange={handleFilterOrderStatusChange}
                  />
                  <span>Đã thanh toán</span>
                </label>
              </div>
              <div className="p-2">
                <p className="font-bold ml-2 px-2">Hiển thị</p>
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="radio"
                    className="form-radio"
                    name="customer_type"
                  />
                  <span>Lượt khách quá giờ</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="radio"
                    className="form-radio"
                    name="customer_type"
                  />
                  <span>Lượt khách sắp đến</span>
                </label>
              </div>
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
          <button
            className="flex items-center border rounded-md px-2 shadow-sm bg-black "
            onClick={() => setIsNewOrder(!isNewOrder)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M280-280h84l240-238-86-86-238 238v86Zm352-266 42-44q6-6 6-14t-6-14l-56-56q-6-6-14-6t-14 6l-44 42 86 86ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm280-590q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" />
            </svg>
            <div className="p-2 text-sm font-bold text-white">Đặt bàn</div>
          </button>
          {isNewOrder && (
            <CreateOrderForm
              newCustomer={newCustomer}
              isNewCustomer={isNewCustomer}
              setIsNewCustomer={setIsNewCustomer}
              searchCustomer={searchCustomer}
              setSearchCustomer={setSearchCustomer}
              filterCustomer={filterCustomer}
              setNewOrder={setNewOrder}
              newOrder={newOrder}
              tableOptions={tableOptions}
              handleSecondSelectChange={handleSecondSelectChange}
              secondSelectValue={secondSelectValue}
              noOptionsMessage={noOptionsMessage}
              toggleNewReservation={toggleNewReservation}
              toggleNewCustomer={toggleNewCustomer}
              setNewCustomer={setNewCustomer}
            />
          )}
        </div>
      </div>
      <OrderList
        initOrders={initOrders}
        customers={customers}
        tables={tables}
        masterChecked={masterChecked}
        checkedRows={checkedRows}
        handleMasterCheckboxChange={handleMasterCheckboxChange}
        handleRowCheckboxChange={handleRowCheckboxChange}
        setHoveredRow={setHoveredRow}
        hoveredRow={hoveredRow}
      />
    </div>
  );
};

export default OrderBookingPage;

"use client";
import React, { useState, useEffect, useRef } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { CustomerEntity } from "./data";
import { formatDateTime, formatDateToString } from "@/utils/timeUtils";

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
  }
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
    totalCost: "1000000"
  },
  {
    id: 6,
    name: "Nguyễn Văn An",
    phoneNumber: "0123456789",
    email: "nguyenvana@gmail.com",
    address: "Hà Nội",
    dob: "1990-01-01",
    gender: "male",
    totalCost: "1000000"
  },
  {
    id: 7,
    name: "Nguyễn Văn Anh",
    phoneNumber: "0123456789",
    email: "nguyenvana@gmail.com",
    address: "Hà Nội",
    dob: "1990-01-01",
    gender: "male",
    totalCost: "1000000"
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
  }
]

const mapOrderStatus = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "Đã xếp bàn";
    case "CHECKED_IN":
      return "Đã nhận bàn";
    case "ABANDONED":
      return "Đến muộn";
    case "CANCELLED":
      return "Đã hủy";
    case "COMPLETED":
      return "Đã thanh toán";
    default:
      return "Không xác định";
  }
}

type GetOrderRequest = {
  page?: number;
  pageSize?: number;
  orderStatus?: Set<string>;
  startTime: string;
  endTime: string;
  paymentMethod?: string;
  tableIds?: Set<number>;
  userName?: string;
  customerName?: string;
  note?: string;
}

const ReceptionPage = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [flyOutActions, setFlyOutActions] = useState(false);
  const [checkedRows, setCheckedRows] = useState({});
  const [masterChecked, setMasterChecked] = useState(false);
  const [searchOptionsOpen, setSearchOptionsOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [filterOrder, setFilterOrder] = useState<GetOrderRequest>({
    startTime: formatDateToString(new Date()),
    endTime: formatDateToString(new Date(new Date().setDate(new Date().getDate() + 1))),
    orderStatus: new Set(),
    tableIds: new Set()
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
    tableIds: new Set()
  });
  const [newCustomer, setNewCustomer] = useState<CustomerEntity>();

  const filterCustomer: CustomerEntity[] = searchCustomer.trim() === "" ? []
    : customers.filter((customer) => customer.name.toLowerCase().includes(searchCustomer.toLowerCase()));
  console.log("filterCustomer", filterCustomer);

  console.log("filterOrder", filterOrder);
  console.log("newOrder", newOrder);
  console.log("newCustomer", newCustomer);

  const handleFilterOrderStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOrderStatus = new Set(filterOrder.orderStatus);
    if (e.target.checked) {
      newOrderStatus.add(e.target.value);
    } else {
      newOrderStatus.delete(e.target.value);
    }
    setFilterOrder({ ...filterOrder, orderStatus: newOrderStatus })
  }

  const handleSelectTableToNewOrderOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTableIds = new Set(newOrder.tableIds);
    if (e.target.checked) {
      newTableIds.add(parseInt(e.target.value));
    } else {
      newTableIds.delete(parseInt(e.target.value));
    }
    setNewOrder({ ...newOrder, tableIds: newTableIds });
  }

  const handleSelectTableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTableIds = new Set(filterOrder.tableIds);
    if (e.target.checked) {
      newTableIds.add(parseInt(e.target.value));
    } else {
      newTableIds.delete(parseInt(e.target.value));
    }
    setFilterOrder({ ...filterOrder, tableIds: newTableIds });
  }

  const filterRef = useRef(null);

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
    reservations.forEach((_, index) => {
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
    const allChecked = reservations.every((_, i) => updatedCheckedRows[i]);
    setMasterChecked(allChecked);
  };

  const isAnyRowChecked = Object.values(checkedRows).some(Boolean);

  const reservations = [
    {
      id: "DB000003",
      time: "16:15 29/10/2024",
      customer: "xcvz",
      phone: "1234asd",
      guests: 1,
      table: "Bàn 19",
      status: "Đã xếp bàn",
      note: "ghi cc",
    },
    {
      id: "DB000004",
      time: "16:42 29/10/2024",
      customer: "asdxcvt",
      phone: "1234315",
      guests: 1,
      table: "Phòng VIP 4",
      status: "Đã nhận bàn",
      note: "",
    },
    {
      id: "DB000005",
      time: "16:55 29/10/2024",
      customer: "ádxcz",
      phone: "123345425",
      guests: 1,
      table: "Bàn 20",
      status: "Đã xếp bàn",
      note: "",
    },
    {
      id: "DB000006",
      time: "18:00 29/10/2024",
      customer: "ádasfzxcv",
      phone: "124235254",
      guests: 1,
      table: "Bàn 17",
      status: "Đã xếp bàn",
      note: "",
    },
  ];

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
              className="p-2 bg-transparent"
              type="text"
              placeholder="Theo tên khách hàng"
              onChange={(e) => setFilterOrder({ ...filterOrder, customerName: e.target.value })}
            />
          </div>
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
          {searchOptionsOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Search Options</h2>
                <form onSubmit={handleSearch}>
                  <input
                    placeholder="Tìm theo khách đặt"
                    className="p-2 mb-2 "
                    onChange={(e) => setFilterOrder({ ...filterOrder, customerName: e.target.value })}
                  ></input>
                  <input
                    placeholder="Theo người nhận đặt"
                    className="p-2 mb-2 "
                    onChange={(e) => setFilterOrder({ ...filterOrder, userName: e.target.value })}
                  ></input>
                  <div className="flex justify-between">
                    <input
                      placeholder="Theo ghi chú"
                      className="p-2 mb-2 "
                      onChange={(e) => setFilterOrder({ ...filterOrder, note: e.target.value })}
                    ></input>
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
          <div className="ml-12">
            <div className="max-w-sm mx-auto">
              <div
                id="rooms/tables"
                className="bg-[#f7fafc] border text-sm rounded-md  p-2 shadow-sm relative"
              >
                <button className="text-sm font-semibold" onClick={() => setIsTableOpen(!isTableOpen)}>Chọn phòng/bàn</button>
                {isTableOpen &&
                  <div className="absolute top-10 left-0 w-full flex flex-col gap-2 rounded-md bg-white">
                    {tables?.map((table) => (
                      <div className="p-0.5 flex gap-4" key={table.id}>
                        <input className="ml-2" type="checkbox" value={table.id} onChange={handleSelectTableChange} />
                        <span>{table.name}</span>
                      </div>
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {isAnyRowChecked && (
            <li
              className="p-2  relative flex items-center space-x-1 border rounded-md"
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
              className="absolute mt-2 w-48 top-32 bg-white border border-gray-300 rounded-md shadow-lg divide-y-2"
            >
              <div className="p-2">
                <p className="font-bold ml-2 px-2">Tình trạng</p>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" value={"CONFIRMED"} onChange={handleFilterOrderStatusChange} />
                  <span>Đã xếp bàn</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" value={"CHECKED_IN"} onChange={handleFilterOrderStatusChange} />
                  <span>Đã nhận bàn</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" value={"ABANDONED"} onChange={handleFilterOrderStatusChange} />
                  <span>Đến muộn</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" value={"CANCELLED"} onChange={handleFilterOrderStatusChange} />
                  <span>Đã hủy</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" value={"COMPLETED"} onChange={handleFilterOrderStatusChange} />
                  <span>Đã thanh toán</span>
                </label>
              </div>
              <div className="p-2">
                <p className="font-bold ml-2 px-2">Hiển thị</p>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Lượt khách quá giờ</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Lượt khách sắp đến</span>
                </label>
              </div>
              <div className="p-2">
                <p className="font-bold ml-2 px-2">Thời gian đặt</p>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Toàn thời gian</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    className="form-input border w-full p-2"
                    placeholder="Từ ngày dd/mm//yyyy"
                  />
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    className="form-input border w-full p-2"
                    placeholder="Đến ngày dd/mm//yyyy"
                  />
                </label>
              </div>
            </div>
          )}
          <button
            className="flex items-center border rounded-md px-2 shadow-sm bg-black mr-6"
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
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-6/10">
                <div className="text-xl font-bold mb-4">Thêm mới đặt bàn</div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-28">Khách hàng</div>
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
                      <div className="flex flex-col">
                        <input
                          className="p-2 bg-transparent"
                          type="text"
                          placeholder="Tìm khách hàng"
                          value={searchCustomer}
                          onChange={(e) => setSearchCustomer(e.target.value)}
                        // Can them mot ham de khi dien, neu tim thay thi mot menu hien xuong, khong nhap gi thi khong hien gi
                        //neu co nhap, khong tim thay thi hien khong thay
                        //con lai thi hien het cac ket qua
                        />
                        {
                          filterCustomer.length > 0 &&
                          <ul>
                            {filterCustomer.map((customer) => (
                              <li
                                onClick={(e) => setNewOrder({ ...newOrder, customerId: customer.id })}
                                key={customer.id}>
                                {customer.name}
                              </li>
                            ))}
                          </ul>
                        }
                      </div>
                      <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Tạo khách hàng mới"
                        onClick={() => setIsNewCustomer(!isNewCustomer)}
                      >
                        <Tooltip id="my-tooltip" />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#000000"
                        >
                          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                        </svg>
                      </button>
                      {isNewCustomer && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                          <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-6/10">
                            <div className="text-xl font-bold mb-4">
                              Thêm khách hàng
                            </div>
                            <div className="flex justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-28">Mã khách hàng</div>
                                <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                                  <input
                                    className="p-2 bg-transparent w-full"
                                    type="text"
                                    placeholder="Mã mặc định"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div>Điện thoại</div>
                                <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                                  <input
                                    className="p-2 bg-transparent w-full"
                                    type="text"
                                    placeholder="Ví dụ: 0912345678"
                                    onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between mt-4">
                              <div className="flex items-center gap-3">
                                <div className="w-28">Tên khách hàng</div>
                                <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                                  <input
                                    className="p-2 bg-transparent w-full"
                                    type="text"
                                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div>Email</div>
                                <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                                  <input
                                    className="p-2 bg-transparent w-full"
                                    type="text"
                                    placeholder="qwe@gmail.com"
                                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between mt-4">
                              <div className="flex items-center gap-3">
                                <div className="w-28">Ngày sinh</div>
                                <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                                  <input
                                    className="p-2 bg-transparent w-full"
                                    type="text"
                                    placeholder="dd/mm/yyyy"
                                    onChange={(e) => setNewCustomer({ ...newCustomer, dob: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div>Ghi chú</div>
                                <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                                  <input
                                    className="p-2 bg-transparent w-full"
                                    type="text"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end gap-3 items-center mt-4">
                              <button
                                className="flex pl-2 items-center border rounded-md bg-black "
                                onClick={toggleNewCustomer}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#FFFFFF"
                                >
                                  <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
                                </svg>
                                <div className="p-2 text-white  rounded right-0">
                                  Lưu
                                </div>
                              </button>
                              <button
                                className="p-2 rounded right-0"
                                onClick={toggleNewCustomer}
                              >
                                Hủy
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div> NV đặt bàn</div>
                    <div className="w-60">
                      <form className=" mx-auto">
                        <select
                          id="staff"
                          className="bg-[#f7fafc] border text-sm rounded-md  p-2 shadow-sm w-60"
                        >
                          <option defaultChecked>Chọn nhân viên</option>
                          <option value="Hoàng - Kinh doanh">
                            Hoàng - Kinh doanh
                          </option>
                          <option value="Hương - Kế toán">
                            Hương - Kế toán
                          </option>
                          <option value="Thế Anh - Chủ tịch">
                            Thế Anh - Chủ tịch
                          </option>
                        </select>
                      </form>{" "}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-28">Mã đặt bàn</div>
                    <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                      <input
                        className="p-2 bg-transparent w-full"
                        type="text"
                        placeholder="Mã tự động"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div> Phòng/bàn</div>
                    <div>
                      <form className="max-w-sm mx-auto">
                        <div
                          id="rooms/tables"
                          className="bg-[#f7fafc] border text-sm rounded-md  p-2 shadow-sm w-60"
                        >
                          {/* <option defaultChecked>Chờ xếp bàn</option>
                          <option value="Phòng 1">Phòng 1</option>
                          <option value="Phòng 3">Phòng 3</option>
                          <option value="Phòng 5">Phòng 5</option> */}
                          {
                            tables.map((table) => (
                              <div className="p-0.5 flex gap-4" key={table.id}>
                                <input className="ml-2" type="checkbox" value={table.id}
                                  onChange={handleSelectTableToNewOrderOrderChange} />
                                <span>{table.name}</span>
                              </div>
                            ))
                          }
                        </div>
                      </form>{" "}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-28">Giờ đến</div>
                    <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                      <input
                        className="p-2 bg-transparent w-full"
                        type="text"
                        placeholder="dd/mm/yyyy hh:mm"
                        value={newOrder.checkInTime}
                        onChange={(e) => setNewOrder({ ...newOrder, checkInTime: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      className="bg-[#f7fafc] border text-sm rounded-md  p-2 shadow-sm w-[329.95px]"
                      placeholder="Ghi chú"
                      value={newOrder.note}
                      onChange={(e) => setNewOrder({ ...newOrder, note: e.target.value })}
                    ></input>
                  </div>
                </div>
                <div className="flex mt-4 gap-3 items-center">
                  <div className="w-28"> Thời lượng (h)</div>
                  <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                    <input
                      className="p-2 bg-transparent w-full text-left"
                      type="text"
                      onChange={(e) => setNewOrder({ ...newOrder, checkOutTime: null })}
                    />
                  </div>
                </div>
                <div className="flex mt-4 gap-3 items-center">
                  <div className="w-28"> Số khách</div>
                  <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                    <input className="p-2 bg-transparent w-full" type="text" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 items-center mt-4">
                  <button
                    className="flex pl-2 items-center border rounded-md bg-black "
                    onClick={toggleNewReservation}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
                    </svg>
                    <div className="p-2 text-white  rounded right-0">Lưu</div>
                  </button>
                  <button
                    className="p-2 rounded right-0"
                    onClick={toggleNewReservation}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200 mt-6">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-4 py-2 border-b text-left">
              <input
                type="checkbox"
                checked={masterChecked}
                onChange={handleMasterCheckboxChange}
              />
            </th>
            <th className="px-4 py-2 border-b text-left">Mã đặt bàn</th>
            <th className="px-4 py-2 border-b text-left">Giờ đến</th>
            <th className="px-4 py-2 border-b text-left">Khách hàng</th>
            <th className="px-4 py-2 border-b text-left">Điện thoại</th>
            <th className="px-4 py-2 border-b text-left">Số khách</th>
            <th className="px-4 py-2 border-b text-left">Phòng/bàn</th>
            <th className="px-4 py-2 border-b text-left">Trạng thái</th>
            <th className="px-4 py-2 border-b text-left">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {initOrders.map((order, index) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50"
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td className="px-4 py-2 border-b">
                <input
                  type="checkbox"
                  checked={!!checkedRows[index]}
                  onChange={() => handleRowCheckboxChange(index)}
                />
              </td>
              <td className="px-4 py-2 border-b text-blue-600">
                <button>{order.id}</button>
              </td>
              <td className="px-4 py-2 border-b">{formatDateTime(order.checkInTime)}</td>
              <td className="px-4 py-2 border-b">{customers.find(c => c.id === order.customerId).name}</td>
              <td className="px-4 py-2 border-b">{customers.find(c => c.id === order.customerId).phoneNumber}</td>
              <td className="px-4 py-2 border-b">{order.numberOfPeople}</td>
              <td className="px-4 py-2 border-b">{tables.find(t => t.id === order.orderTables[0].id).name}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 text-sm font-semibold rounded ${order.orderStatus === "CONFIRMED"
                    ? "bg-green-100 text-green-600"
                    : order.orderStatus === "CHECKED_IN"
                      ? "bg-yellow-100 text-yellow-600"
                      : order.orderStatus === "COMPLETED"
                        ? "bg-blue-100 text-blue-600"
                        : order.orderStatus === "CANCELLED"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${order.orderStatus === "CONFIRMED"
                      ? "bg-green-600"
                      : order.orderStatus === "CHECKED_IN"
                        ? "bg-yellow-600"
                        : order.orderStatus === "COMPLETE"
                          ? "bg-blue-600"
                          : order.orderStatus === "CANCELLED"
                            ? "bg-red-600"
                            : "bg-gray-600"
                      }`}
                  ></span>
                  {mapOrderStatus(order.orderStatus)}
                </span>
              </td>
              <td className="px-4 py-2 border-b">
                {hoveredRow === null && order.note}
                {hoveredRow === index && (
                  <div className="flex space-x-2 mt-2">
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Nhận bàn"
                    >
                      <Tooltip id="my-tooltip" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                      </svg>
                    </button>
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Nhận gọi món"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z" />
                      </svg>
                    </button>
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Hủy đặt"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceptionPage;

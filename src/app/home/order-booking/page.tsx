"use client";

import React, { useState, useEffect, useRef } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { formatDateToString } from "@/utils/timeUtils";
import OrderList from "./order-list";
import CreateOrderForm from "./create-order-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { OrderEntity } from "../order-taking/entity";
import { PageInfo } from "@/app/api-client/PageInfo";
import { getAllOrders, updateOrderStatus } from "@/app/api-client/OrderService";

type ParamsRequest = {
  page: number;
  page_size: number;
  order_status?: string[];
  start_time: Date;
  end_time: Date;
  user_name?: string;
  customer_name?: string;
  note?: string;
  tableIds?: number[];
};

// const Option = (props) => {
//   return (
//     <div>
//       <components.Option {...props}>
//         <input
//           type="checkbox"
//           checked={props.isSelected}
//           onChange={() => null}
//         />{" "}
//         <label>{props.label}</label>
//       </components.Option>
//     </div>
//   );
// };

// const DropdownIndicator = null;

// const customStyles = {
//   control: (styles) => ({
//     ...styles,
//     backgroundColor: "transparent",
//     borderColor: "#f7f7f7",
//     padding: "0rem", // equivalent to Tailwind's p-2
//     width: "30rem", // equivalent to Tailwind's w-60
//     outline: "none",
//     fontSize: "0.875rem", // equivalent to Tailwind's text-sm
//     boxShadow: "none",
//     "&:hover": {
//       borderColor: "transparent", // Keeps the border color on hover as none
//     },
//   }),
//   option: (styles, { isFocused, isSelected }) => ({
//     ...styles,
//     backgroundColor: isSelected ? "#7ab5e6" : isFocused ? "#ebf8ff" : "white",
//     color: isSelected ? "white" : "#2d3748",
//     cursor: "pointer",
//     "&:hover": {
//       backgroundColor: "#ebf8ff",
//       color: "#2d3748",
//     },
//   }),
//   multiValue: (styles) => ({
//     ...styles,
//     backgroundColor: "#b7b7b7",
//     borderRadius: "12px",
//     padding: "0.25rem", // Adds padding for multi-value items
//   }),
//   multiValueLabel: (styles) => ({
//     ...styles,
//     color: "#2d3748",
//     fontSize: "0.875rem", // Tailwind text-sm equivalent
//   }),
//   multiValueRemove: (styles) => ({
//     ...styles,
//     color: "#2d3748",
//     ":hover": {
//       backgroundColor: "#e53e3e",
//       color: "white",
//     },
//   }),
//   menu: (styles) => ({
//     ...styles,
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
//   }),
//   input: (styles) => ({
//     ...styles,
//     width: "15rem", // Tailwind w-60 equivalent
//     margin: "0px",
//     fontSize: "0.875rem", // Tailwind text-sm equivalent
//   }),
// };

const OrderBookingPage = () => {
  const filterRef = useRef(null);

  // const [tables, setTables] = useState<TableEntity[]>(sampleTables);

  const [orders, setOrders] = useState<OrderEntity[]>([]);

  // const [customers, setCustomers] = useState<CustomerEntity[]>(sampleCustomers);

  const [checkedOrders, setCheckedOrders] = useState<OrderEntity[]>([]);

  const [searchOptionsOpen, setSearchOptionsOpen] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isNewOrder, setIsNewOrder] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    setParamsRequest({
      ...paramsRequest,
      page_size: value,
      page: 0,
    });
  };

  const handlePageNumberChange = (value: number) => {
    setParamsRequest({
      ...paramsRequest,
      page: value,
    });
  };
  // const [selectedTables, setSelectedTables] = useState<
  //   {
  //     value: number;
  //     label: string;
  //   }[]
  // >([]);

  const [searchCustomerText, setSearchCustomerText] = useState("");

  const [searchStaffText, setSearchStaffText] = useState("");

  const [searchNoteText, setSearchNoteText] = useState("");

  const [displayMode, setDisplayMode] = useState("all");

  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  const [endDate, setEndDate] = useState(
    new Date(
      new Date(new Date().setDate(new Date().getDate() + 7)).setHours(
        23,
        59,
        59,
        999
      )
    )
  );

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPage: null,
    totalRecord: null,
    pageSize: null,
    nextPage: null,
    previousPage: null,
  });

  const [paramsRequest, setParamsRequest] = useState<ParamsRequest>({
    page: 0,
    page_size: 10,
    order_status: [],
    start_time: startDate,
    end_time: endDate,
    user_name: "",
    customer_name: "",
    note: "",
    tableIds: [],
  });

  useEffect(() => {
    // const now = new Date();
    // const start = new Date(now);
    // start.setHours(0, 0, 0, 0);

    // const end = new Date(now);
    // end.setHours(23, 59, 59, 999);

    // console.log(start);
    // console.log(end);
    // const start = new Date("2024-10-01T00:00:00");
    // const end = new Date("2024-12-30T23:59:59");

    // setStartDate(start);
    // setEndDate(end);

    setParamsRequest((prev) => ({
      ...prev,
      start_time: startDate,
      end_time: endDate,
    }));
  }, [isNewOrder]);

  useEffect(() => {
    /* Gọi API */
    const query = Object.entries(paramsRequest)
      .filter(
        ([key, value]) =>
          value !== "" && !(Array.isArray(value) && value.length === 0)
      )
      .map(([key, value]) => {
        if (value instanceof Date) {
          return `${key}=${formatDateToString(value)}`;
        } else if (Array.isArray(value)) {
          return `${key}=${value.join(",")}`;
        } else {
          return `${key}=${value}`;
        }
      })
      .join("&");
    console.log(query);

    getAllOrders(query).then((data) => {
      setPageInfo(data.first);
      setOrders(data.second);
    });
  }, [paramsRequest]);

  useEffect(() => {
    setParamsRequest((prev) => ({ ...prev, page: 0 }));
  }, [
    paramsRequest.order_status,
    paramsRequest.customer_name,
    paramsRequest.user_name,
    paramsRequest.note,
    paramsRequest.start_time,
    paramsRequest.end_time,
  ]);

  // useEffect(() => {
  //   /* Gọi API */
  //   setTables(sampleTables);
  //   setCustomers(sampleCustomers);
  // }, []);

  // const handleSelectedTablesChange = (selectedOptions) => {
  //   setSelectedTables(selectedOptions);

  //   setParamsRequest((prev) => ({
  //     ...prev,
  //     tableIds: selectedOptions.map((option) => option.value),
  //   }));
  // };

  const handleCustomerSearchKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setParamsRequest((prev) => ({
        ...prev,
        customer_name: searchCustomerText,
      }));
    }
  };

  const handleSearchOptions = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setParamsRequest((prev) => ({
      ...prev,
      customer_name: searchCustomerText,
      user_name: searchStaffText,
      note: searchNoteText,
    }));
    setSearchOptionsOpen(false);
  };

  const handleFilterOrderStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPage(1);
    if (e.target.checked) {
      setParamsRequest((prev) => ({
        ...prev,
        order_status: [...prev.order_status, e.target.value],
        page: 0,
      }));
    } else {
      setParamsRequest((prev) => ({
        ...prev,
        order_status: prev.order_status.filter(
          (status) => status !== e.target.value
        ),
        page: 0,
      }));
    }
  };

  const handleIncomingCustomerDisplayChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPage(1);
    if (e.target.value === "late") {
      setParamsRequest((prev) => ({
        ...prev,
        start_time: startDate,
        end_time: new Date(),
        page: 0,
      }));
      setDisplayMode("late");
    } else if (e.target.value === "incoming") {
      setParamsRequest((prev) => ({
        ...prev,
        start_time: new Date(),
        end_time: endDate,
        page: 0,
      }));
      setDisplayMode("incoming");
    } else {
      setParamsRequest((prev) => ({
        ...prev,
        start_time: startDate,
        end_time: endDate,
        page: 0,
      }));
      setDisplayMode("all");
    }
  };

  const handleCheck = (order: OrderEntity, check: boolean) => {
    if (check) {
      setCheckedOrders((prev) => [...prev, order]);
    } else {
      setCheckedOrders((prev) => prev.filter((ord) => ord.id !== order.id));
    }
  };

  const handleCheckAll = (check: boolean) => {
    setCheckedOrders(check ? orders : []);
  };

  const handleUpdateStatus = async (order: OrderEntity, status: string) => {
    if (order.orderStatus !== "CONFIRMED" && order.orderStatus !== "ABANDONED")
      return;

    /* Gọi API */
    // updateOrderStatus(orderId, { status });
    // if (ok) {
    updateOrderStatus(order.id, { status }).then((res) => {
      console.log(res);
    });

    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === order.id ? { ...ord, orderStatus: status } : ord
      )
    );
  };

  const handleMultipleOrders = (status: string) => {
    checkedOrders.forEach((orderId) => {
      handleUpdateStatus(orderId, status);
    });
    setCheckedOrders([]);
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
              value={searchCustomerText}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchCustomerText(e.target.value);
              }}
              onKeyDown={handleCustomerSearchKeyDown}
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
                <h2 className="text-xl font-bold mb-4">Tìm kiếm nâng cao</h2>
                <form onSubmit={handleSearchOptions}>
                  <input
                    placeholder="Tìm theo khách đặt"
                    className="p-2 mt-2 w-full outline-none border-b-2 focus:border-b-black"
                    value={searchCustomerText}
                    onChange={(e) => setSearchCustomerText(e.target.value)}
                  />
                  <input
                    placeholder="Theo người nhận đặt"
                    className="p-2 mt-2 w-full outline-none border-b-2 focus:border-b-black"
                    value={searchStaffText}
                    onChange={(e) => setSearchStaffText(e.target.value)}
                  />
                  <div className="flex justify-between">
                    <input
                      placeholder="Theo ghi chú"
                      className="p-2 mt-2 w-full border-b-2 focus:border-b-black outline-none"
                      value={searchNoteText}
                      onChange={(e) => setSearchNoteText(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end mt-8 mb-2">
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="p-2 bg-black text-white rounded mb-2"
                      >
                        Tìm kiếm
                      </button>
                      <button
                        className="p-2 rounded"
                        onClick={() => setSearchOptionsOpen((prev) => !prev)}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* <div className="ml-2 ">
            <ReactSelect
              options={tables.map((table) => ({
                value: table.id,
                label: table.name,
              }))}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option,
                DropdownIndicator,
              }}
              placeholder="Chọn phòng/bàn"
              onChange={handleSelectedTablesChange}
              value={selectedTables}
              styles={customStyles}
              noOptionsMessage={() => "Bàn/Phòng không có sẵn"}
              // Hide dropdown list  when select any item
              // closeMenuOnSelect={true}

              //Selected Item Remove in dropdown list
              // hideSelectedOptions={true}
            />
          </div> */}
        </div>
        <div className="flex gap-4 justify-end">
          {checkedOrders.length > 0 && (
            <>
              <button
                className="flex items-center border border-green-500 rounded-md px-2 shadow-sm hover:shadow-md"
                onClick={() => handleMultipleOrders("CHECKED_IN")}
              >
                <div className="p-2 text-sm font-semibold text-green-500">
                  Nhận bàn
                </div>
              </button>

              <button
                className="flex items-center border border-red-500 rounded-md px-2 shadow-sm hover:shadow-md"
                onClick={() => handleMultipleOrders("CANCELLED")}
              >
                <div className="p-2 text-sm font-semibold text-red-500">
                  Hủy đặt
                </div>
              </button>
            </>
          )}
          <div ref={filterRef} className="relative">
            <button
              className="flex items-center border rounded-md px-2 shadow-sm hover:shadow-md"
              onClick={() => setIsFilterOpen((prev) => !prev)}
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
              <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg divide-y-2">
                <div className="p-2">
                  <p className="font-bold ml-2 px-2">Tình trạng</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={"CONFIRMED"}
                      checked={paramsRequest.order_status.includes("CONFIRMED")}
                      onChange={handleFilterOrderStatusChange}
                    />
                    <span>Đã xếp bàn</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={"CHECKED_IN"}
                      checked={paramsRequest.order_status.includes(
                        "CHECKED_IN"
                      )}
                      onChange={handleFilterOrderStatusChange}
                    />
                    <span>Đã nhận bàn</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={"ABANDONED"}
                      checked={paramsRequest.order_status.includes("ABANDONED")}
                      onChange={handleFilterOrderStatusChange}
                    />
                    <span>Đến muộn</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={"CANCELLED"}
                      checked={paramsRequest.order_status.includes("CANCELLED")}
                      onChange={handleFilterOrderStatusChange}
                    />
                    <span>Đã hủy</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      value={"COMPLETED"}
                      checked={paramsRequest.order_status.includes("COMPLETED")}
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
                      value={"all"}
                      checked={displayMode === "all"}
                      onChange={handleIncomingCustomerDisplayChange}
                    />
                    <span>Tất cả</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="radio"
                      className="form-radio"
                      name="customer_type"
                      value={"late"}
                      checked={displayMode === "late"}
                      onChange={handleIncomingCustomerDisplayChange}
                    />
                    <span>Lượt khách quá giờ</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="radio"
                      className="form-radio"
                      name="customer_type"
                      value={"incoming"}
                      checked={displayMode === "incoming"}
                      onChange={handleIncomingCustomerDisplayChange}
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
                      onChange={(date: Date | [Date, Date]) => {
                        setCurrentPage(1);
                        const selectedDate = Array.isArray(date)
                          ? date[0]
                          : date;
                        setStartDate(selectedDate);
                        if (displayMode === "late" || displayMode === "all") {
                          setParamsRequest((prev) => ({
                            ...prev,
                            start_time: selectedDate,
                          }));
                        }
                      }}
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
                      onChange={(date: Date | [Date, Date]) => {
                        setCurrentPage(1);
                        const selectedDate = Array.isArray(date)
                          ? date[0]
                          : date;
                        setEndDate(selectedDate);
                        if (
                          displayMode === "incoming" ||
                          displayMode === "all"
                        ) {
                          setParamsRequest((prev) => ({
                            ...prev,
                            end_time: selectedDate,
                          }));
                        }
                      }}
                      selectsEnd
                      endDate={endDate}
                      minDate={startDate}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
          <button
            className="flex items-center border rounded-md px-2 shadow-sm bg-black hover:shadow-md"
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
              setOrders={setOrders}
              setIsNewOrder={setIsNewOrder}
            />
          )}
        </div>
      </div>
      <OrderList
        orders={orders}
        checkedOrders={checkedOrders}
        handleCheck={handleCheck}
        handleCheckAll={handleCheckAll}
        handleUpdateStatus={handleUpdateStatus}
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
              setParamsRequest((prevParams) => ({
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
          {orders.length > 0 && (
            <span>
              Page {Math.min(currentPage, pageInfo.totalPage)} of{" "}
              {pageInfo.totalPage}
            </span>
          )}
          <button
            onClick={() => {
              changePage(currentPage + 1); // Cập nhật số trang
              setParamsRequest((prevParams) => ({
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
  );
};

export default OrderBookingPage;

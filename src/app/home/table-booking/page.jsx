"use client";
import React, { useState, useEffect, useRef } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const ReceptionPage = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [flyOutActions, setFlyOutActions] = useState(false);
  const [checkedRows, setCheckedRows] = useState({});
  const [masterChecked, setMasterChecked] = useState(false);
  const [searchOptionsOpen, setSearchOptionsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [newReservation, setNewReservation] = useState(false);
  const [newCustomer, setNewCustomer] = useState(false);

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
    setNewCustomer((prev) => !prev);
  };

  const toggleNewReservation = () => {
    setNewReservation((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
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
              placeholder="Theo mã đặt bàn"
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Search Options</h2>
                <form onSubmit={handleSearch}>
                  <input
                    placeholder="Theo mã đặt bàn"
                    className="p-2 mb-2 "
                  ></input>
                  <input
                    placeholder="Tìm theo khách đặt"
                    className="p-2 mb-2 "
                  ></input>
                  <input
                    placeholder="Theo người nhận đặt"
                    className="p-2 mb-2 "
                  ></input>
                  <div className="flex justify-between">
                    <input
                      placeholder="Theo ghi chú"
                      className="p-2 mb-2 "
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
          <div>
            <form className="max-w-sm mx-auto">
              <select
                id="rooms/tables"
                className="bg-[#f7fafc] border text-sm rounded-md  p-2 shadow-sm"
              >
                <option defaultValue>Chọn phòng/bàn</option>
                <option value="Bàn 1">Bàn 1</option>
                <option value="Bàn 2">Bàn 2</option>
                <option value="Bàn 3">Bàn 3</option>
                <option value="Phòng VIP 1">Phòng VIP 1</option>
              </select>
            </form>
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
                  <input type="checkbox" className="form-checkbox" />
                  <span>Chờ xếp bàn</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Đã xếp bàn</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Đã nhận bàn</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Đã hủy</span>
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
            onClick={() => setNewReservation(!newReservation)}
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
          {newReservation && (
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
                      <input
                        className="p-2 bg-transparent"
                        type="text"
                        placeholder="Tìm khách hàng"
                        // Can them mot ham de khi dien, neu tim thay thi mot menu hien xuong, khong nhap gi thi khong hien gi
                        //neu co nhap, khong tim thay thi hien khong thay
                        //con lai thi hien het cac ket qua
                      />
                      <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Tạo khách hàng mới"
                        onClick={() => setNewCustomer(!newCustomer)}
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
                      {newCustomer && (
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
                          <option defaultValue>Chọn nhân viên</option>
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
                        <select
                          id="rooms/tables"
                          className="bg-[#f7fafc] border text-sm rounded-md  p-2 shadow-sm w-60"
                        >
                          <option defaultValue>Chờ xếp bàn</option>
                          <option value="Phòng 1">Phòng 1</option>
                          <option value="Phòng 3">Phòng 3</option>
                          <option value="Phòng 5">Phòng 5</option>
                        </select>
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
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      className="bg-[#f7fafc] border text-sm rounded-md  p-2 shadow-sm w-[329.95px]"
                      placeholder="Ghi chú"
                    ></input>
                  </div>
                </div>
                <div className="flex mt-4 gap-3 items-center">
                  <div className="w-28"> Thời lượng (h)</div>
                  <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[243.5px]">
                    <input
                      className="p-2 bg-transparent w-full text-right"
                      type="text"
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
          {reservations.map((reservation, index) => (
            <tr
              key={index}
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
                <button>{reservation.id}</button>
              </td>
              <td className="px-4 py-2 border-b">{reservation.time}</td>
              <td className="px-4 py-2 border-b">{reservation.customer}</td>
              <td className="px-4 py-2 border-b">{reservation.phone}</td>
              <td className="px-4 py-2 border-b">{reservation.guests}</td>
              <td className="px-4 py-2 border-b">{reservation.table}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 text-sm font-semibold rounded ${
                    reservation.status === "Đã xếp bàn"
                      ? "bg-green-100 text-green-600"
                      : reservation.status === "Chờ xếp bàn"
                      ? "bg-yellow-100 text-yellow-600"
                      : reservation.status === "Đã nhận bàn"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      reservation.status === "Đã xếp bàn"
                        ? "bg-green-600"
                        : reservation.status === "Chờ xếp bàn"
                        ? "bg-yellow-600"
                        : reservation.status === "Đã nhận bàn"
                        ? "bg-blue-600"
                        : "bg-red-600"
                    }`}
                  ></span>
                  {reservation.status}
                </span>
              </td>
              <td className="px-4 py-2 border-b">
                {hoveredRow === null && reservation.note}
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

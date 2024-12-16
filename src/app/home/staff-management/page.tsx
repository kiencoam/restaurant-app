"use client";
//chạy đoạn create role trước
import React, { useState, useRef, useEffect, useContext } from "react";
import CreateStaffForm from "./create-staff-form";
import StaffList from "./staff-list";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  UserEntity,
  CreateUserRequest,
  getAllUsers,
} from "@/app/api-client/UserService";
import { PageInfo } from "@/app/api-client/PageInfo";
import {
  createRole,
  CreateRoleRequest,
  deleteRole,
  getAllRoles,
} from "@/app/api-client/RoleService";
import { loginUserContext } from "@/components/LoginUserProvider";

//User

// const staffs: UserEntity[] = [
//   {
//     id: 1,
//     name: "Nguyễn Văn A",
//     phoneNumber: "0123456789",
//     email: "nguyenvana@gmail.com",
//     password: "123",
//     address: "Hà Nội",
//     dob: "01/01/1990",
//     gender: "male",
//     roleId: 1,
//     position: "ADMIN",
//     salaryType: "HOURLY",
//     salaryPerHour: 15000,
//     salaryPerMonth: 0,
//     status: "IN",
//     note: "Newbie",
//   },
//   {
//     id: 2,
//     name: "Nguyễn Văn B",
//     phoneNumber: "0123456789",
//     email: "nguyenvanb@gmail.com",
//     password: "123",
//     address: "Hà Nội",
//     dob: "01/02/1989",
//     gender: "female",
//     roleId: 1,
//     position: "CHEF",
//     salaryType: "DAILY",
//     salaryPerHour: 0,
//     salaryPerMonth: 15000000,
//     status: "OUT",
//     note: "Con giam doc",
//   },
// ];

export type GetStaffRequest = {
  page: number;
  page_size: number;
  phone_number?: string;
  name?: string;
  role_id?: number;
};

const StaffManagementPage = () => {
  const [staffs, setStaffs] = useState<UserEntity[]>([]);

  const [masterChecked, setMasterChecked] = useState(false);

  const [flyOutActions, setFlyOutActions] = useState(false);

  const [checkedRows, setCheckedRows] = useState({});

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);

  const [isNewStaff, setIsNewStaff] = useState(false);

  const [expandedRow, setExpandedRow] = useState(null);

  const [startDate, setStartDate] = useState(new Date("2004/01/01"));

  const [endDate, setEndDate] = useState(new Date("2025/12/31"));

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPage: null,
    totalRecord: null,
    pageSize: null,
    nextPage: null,
    previousPage: null,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filter, setFilter] = useState<GetStaffRequest>({
    page: 0,
    page_size: 5,
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
      page: 0,
    });
  };

  const handlePageNumberChange = (value: number) => {
    setFilter({
      ...filter,
      page: value,
    });
  };

  useEffect(() => {
    const query = Object.entries(filter)
      .map(([key, value]) => {
        if (value) {
          return `${key}=${value}`;
        }
      })
      .join("&");

    getAllUsers(query).then((data) => {
      const allStaffs = data.second;
      let filteredStaffs = allStaffs;
      // if (tempRole === 'MANAGER') {
      //   const roleIds = ['CASHIER','WAITER','CHEF'];
      //   filteredStaffs = allStaffs.filter(staff =>
      //     roleIds.includes(staff.position)
      //   );
      // }
      setStaffs(filteredStaffs);
      setPageInfo(data.first);
    });
    console.log(query);
  }, [filter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    const value = e.target.value;

    const isPhoneNumber = /^[0-9]+$/.test(value);

    if (isPhoneNumber) {
      console.log("true");
      setFilter({
        ...filter,
        phone_number: value,
        name: "",
        page: 0,
      });
    } else {
      setFilter({
        ...filter,
        name: value,
        phone_number: "",
        page: 0,
      });
    }
  };

  const handleFilterCostChange = (e, field) => {
    let newValue = e.target.value;
    if (newValue === "") {
      newValue = null;
    } else {
      newValue = Number(newValue);
    }

    setFilter({
      ...filter,
      [field]: newValue,
      page: 0,
    });
  };

  const handleStartDateChange = (date) => {
    setCurrentPage(1);
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setCurrentPage(1);
    setEndDate(date);
  };

  const isAnyRowChecked = Object.values(checkedRows).some(Boolean);

  const handleRowClick = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null); // Collapse the row if it's already expanded
    } else {
      setExpandedRow(id); // Expand the clicked row
    }
  };

  const toggleNewStaff = () => {
    setIsNewStaff((prev) => !prev);
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

  const handleMasterCheckboxChange = () => {
    const newMasterChecked = !masterChecked;
    setMasterChecked(newMasterChecked);

    const updatedCheckedRows = {};
    staffs.forEach((staff) => {
      updatedCheckedRows[staff.id] = newMasterChecked;
    });
    setCheckedRows(updatedCheckedRows);
  };

  useEffect(() => {
    // Sync master checkbox with individual row checkboxes
    const allChecked = staffs.every((staff) => checkedRows[staff.id]);
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
        <div className="text-2xl font-extrabold">Nhân viên</div>
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
              placeholder="Tìm theo tên, điện thoại"
              value={filter.name || filter.phone_number}
              onChange={handleSearchChange}
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
                  {/* Filter không có sinh nhật */}
                  <p className="font-bold m-2 px-2">Sinh nhật</p>
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
                {/* <div className="p-2">
                  <p className="font-bold m-2 px-2">Trạng thái</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Đang làm việc</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Đã nghỉ</span>
                  </label>
                </div> */}
              </div>
            )}
          </div>
          <button
            className="flex items-center border rounded-md px-2 shadow-sm bg-black"
            onClick={toggleNewStaff}
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
            <div className="p-2 text-sm font-bold text-white">Tạo mới</div>
          </button>
          {isNewStaff && (
            <CreateStaffForm
              setStaffs={setStaffs}
              toggleNewStaff={toggleNewStaff}
              pageSize={pageInfo.pageSize}
              setFilter={setFilter}
            />
          )}{" "}
        </div>
      </div>
      <div className="px-6">
        <StaffList
          staffs={staffs}
          setStaffs={setStaffs}
          setFilter={setFilter}
          masterChecked={masterChecked}
          checkedRows={checkedRows}
          pageInfo={pageInfo}
          handleMasterCheckboxChange={handleMasterCheckboxChange}
          handleRowCheckboxChange={handleRowCheckboxChange}
          handleRowClick={handleRowClick}
          expandedRow={expandedRow}
          handlePageSizeChange={handlePageSizeChange}
          handlePageNumberChange={handlePageNumberChange}
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
                setFilter((prevParams) => ({
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
            {staffs.length > 0 && (
              <span>
                Page {Math.min(currentPage, pageInfo.totalPage)} of{" "}
                {pageInfo.totalPage}
              </span>
            )}
            <button
              onClick={() => {
                changePage(currentPage + 1); // Cập nhật số trang
                setFilter((prevParams) => ({
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

export default StaffManagementPage;

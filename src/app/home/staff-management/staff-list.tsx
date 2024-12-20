//Phải comment một số tsx input vì backend chưa có !

import { PageInfo } from "@/app/api-client/PageInfo";
import {
  updateUser,
  UpdateUserRequest,
  UserEntity,
} from "@/app/api-client/UserService";
import { loginUserContext } from "@/components/LoginUserProvider";
import { formatDateToYYYYMMDD } from "@/utils/timeUtils";
import React, { useContext, useState } from "react";
import { GetStaffRequest } from "./page";

type Props = {
  staffs: UserEntity[]; // Assuming StaffEntity is the type for a staff object
  setStaffs: React.Dispatch<React.SetStateAction<UserEntity[]>>;
  setFilter: React.Dispatch<React.SetStateAction<GetStaffRequest>>;
  masterChecked: boolean;
  checkedRows: Record<number, boolean>;
  pageInfo: PageInfo;
  handleMasterCheckboxChange: () => void;
  handleRowCheckboxChange: (id: number) => void;
  handleRowClick: (id: number) => void;
  expandedRow: number | null;
  handlePageSizeChange: (pageSize: number) => void;
  handlePageNumberChange: (page: number) => void;
};

export default function StaffList({
  staffs,
  setStaffs,
  setFilter,
  masterChecked,
  checkedRows,
  handleMasterCheckboxChange,
  handleRowCheckboxChange,
  handleRowClick,
  expandedRow,
  pageInfo,
  handlePageSizeChange,
  handlePageNumberChange,
}: Props) {
  const [isCharsVisible, changeCharsVisibility] = useState(false);

  const toggleCharsVisibility = () => {
    changeCharsVisibility(!isCharsVisible);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  let currRole = useContext(loginUserContext).role;
  let currId = useContext(loginUserContext).id;
  // currRole = "MANAGER";
  // currId = 12;

  // Calculate total pages
  const totalPages = Math.ceil(staffs.length / rowsPerPage);

  // Get current page rows
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRowsStaffs = staffs.slice(startIndex, startIndex + rowsPerPage);

  // Handle page change
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

  // function formatDate(date: Date): string {
  //   if (!date) {
  //     return ""; // Return an empty string or a fallback value if the date is invalid
  //   }
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }

  // console.log("staffs:", staffs);

  const handleSaveStaff = (id: number) => {
    handleRowClick(id);
    const selectedStaff = staffs.find((Staff) => Staff.id === id);
    if (selectedStaff) {
      const updatedStaff: UpdateUserRequest = {
        name: selectedStaff.name,
        phoneNumber: selectedStaff.phoneNumber,
        gender: selectedStaff.gender,
        dateOfBirth: selectedStaff.dateOfBirth,
        roleId: selectedStaff.roleId,
        cccd: selectedStaff.cccd,
        cvImg: selectedStaff.cvImg,
        position: selectedStaff.position,
        salaryType: selectedStaff.salaryType,
        salaryPerHour: selectedStaff.salaryPerHour,
        salaryPerMonth: selectedStaff.salaryPerMonth,
      };

      try {
        updateUser(id, updatedStaff).then((res) => {
          console.log("Staff updated:", res);
          setFilter((prev) => ({ ...prev })); // Kích hoạt useEffect
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdateStaff = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: number,
    field: string
  ) => {
    const newStaffs = staffs.map((Staff) =>
      Staff.id === id
        ? {
            ...Staff,
            [field]: e.target.value,
          }
        : Staff
    );

    setStaffs(newStaffs);
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 mt-6">
        <thead>
          <tr className="bg-[#f7fafc] border-b-2">
            {/* <th className="px-4 py-2 border-b text-left">
              <input
                type="checkbox"
                checked={masterChecked}
                onChange={handleMasterCheckboxChange}
              />
            </th> */}
            <th className="px-4 py-2 border-b text-left">Mã nhân viên</th>
            <th className="px-4 py-2 border-b text-left">Tên nhân viên</th>
            <th className="px-4 py-2 border-b text-left">Điện thoại</th>
            <th className="px-4 py-2 border-b text-left">Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff) => (
            <React.Fragment key={staff.id}>
              <tr
                key={staff.id}
                className={`hover:bg-gray-100 border-b-2 cursor-pointer ${
                  checkedRows[staff.id] ? "bg-gray-100" : ""
                }`}
                onClick={(e) => {
                  const target = e.target as HTMLElement; // Cast to HTMLElement

                  // Ignore click on checkboxes and action buttons
                  if (
                    (target instanceof HTMLInputElement &&
                      target.type === "checkbox") ||
                    target.tagName.toLowerCase() === "button" ||
                    target.closest("button")
                  ) {
                    return;
                  }
                  handleRowClick(staff.id); // Expand or collapse row
                }}
              >
                {/* <td className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    checked={!!checkedRows[staff.id]}
                    onChange={() => handleRowCheckboxChange(staff.id)}
                  />
                </td> */}
                <td className="px-4 py-2 border-b text-blue-600 pl-11">
                  <button>{staff.id}</button>
                </td>
                <td className="px-4 py-2 border-b">{staff.name}</td>
                <td className="px-4 py-2 border-b">{staff.phoneNumber}</td>
                <td className="px-4 py-2 border-b">{staff.role.description}</td>
              </tr>
              {expandedRow === staff.id &&
                ((currRole === "MANAGER" &&
                  staff.position !== "ADMIN" &&
                  staff.position !== "MANAGER") ||
                  currRole === "ADMIN" ||
                  staff.id === currId) && (
                  <tr>
                    <td colSpan={5} className="bg-gray-50 p-4">
                      {/* Detailed information and editable fields */}
                      <div>
                        <form className="space-y-4">
                          <div className="flex space-x-12">
                            <label className="w-64">
                              Mã nhân viên
                              <input
                                type="text"
                                value={staff.id}
                                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                disabled
                              />
                            </label>
                            <label className="w-64">
                              Email
                              <input
                                type="text"
                                value={staff.email}
                                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                onChange={(e) =>
                                  handleUpdateStaff(e, staff.id, "email")
                                }
                              />
                            </label>
                            <label className="w-64">
                              Mật khẩu
                              <div className="flex">
                                <input
                                  type={isCharsVisible ? "text" : "password"}
                                  value={staff.password}
                                  placeholder="Nhập mật khẩu mới"
                                  className="w-full border-b-2 bg-[#f7fafc] mt-2 outline-none"
                                  onChange={(e) =>
                                    handleUpdateStaff(e, staff.id, "password")
                                  }
                                />
                                <button
                                  type="button"
                                  className="border-b-2"
                                  onClick={toggleCharsVisibility}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#000000"
                                  >
                                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                  </svg>
                                </button>
                              </div>
                            </label>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-12">
                              <label className="w-64">
                                Tên nhân viên
                                <input
                                  type="text"
                                  value={staff.name}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  onChange={(e) =>
                                    handleUpdateStaff(e, staff.id, "name")
                                  }
                                />
                              </label>
                              <label className="w-64">
                                Điện thoại
                                <input
                                  type="text"
                                  value={staff.phoneNumber}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  onChange={(e) =>
                                    handleUpdateStaff(
                                      e,
                                      staff.id,
                                      "phoneNumber"
                                    )
                                  }
                                />
                              </label>
                              {/* <label className="w-64">
                              Trạng thái
                              <select className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black">
                                <option selected>
                                  {staff.status === "IN"
                                    ? "Đang làm việc"
                                    : "Đã nghỉ"}
                                </option>
                                <option value="IN">Đang làm việc</option>
                                <option value="OUT">Đã nghỉ</option>
                              </select>
                            </label> */}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-12">
                              <label className="w-64">
                                Ngày sinh
                                <input
                                  type="text"
                                  value={staff.dateOfBirth}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  onChange={(e) =>
                                    handleUpdateStaff(
                                      e,
                                      staff.id,
                                      "dateOfBirth"
                                    )
                                  }
                                />
                              </label>
                              {/* <label className="w-64">
                              Địa chỉ
                              <input
                                type="text"
                                value={staff.address}
                                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                              />
                            </label> */}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-12">
                              <label className="w-64">
                                Loại lương
                                <select
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  onChange={(e) =>
                                    handleUpdateStaff(e, staff.id, "salaryType")
                                  }
                                  value={staff.salaryType} // This ensures the correct option is selected
                                >
                                  <option value="HOURLY">
                                    {staff.salaryType === "HOURLY"
                                      ? "Theo giờ"
                                      : "Theo ngày"}
                                  </option>
                                  <option value="HOURLY">Theo giờ</option>
                                  <option value="DAILY">Theo tháng</option>
                                </select>
                              </label>
                              {staff.salaryType === "HOURLY" ? (
                                <label className="w-64">
                                  Lương theo giờ
                                  <input
                                    type="text"
                                    value={staff.salaryPerHour}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    onChange={(e) =>
                                      handleUpdateStaff(
                                        e,
                                        staff.id,
                                        "salaryPerHour"
                                      )
                                    }
                                  />
                                </label>
                              ) : (
                                <label className="w-64">
                                  Lương theo tháng
                                  <input
                                    type="text"
                                    value={staff.salaryPerMonth}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    onChange={(e) =>
                                      handleUpdateStaff(
                                        e,
                                        staff.id,
                                        "salaryPerMonth"
                                      )
                                    }
                                  />
                                </label>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-center"></div>
                          <div className="flex justify-end">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveStaff(staff.id)}
                                className="border rounded-md px-2 shadow-sm bg-black text-white"
                              >
                                Lưu
                              </button>
                              <button
                                onClick={() => handleRowClick(staff.id)}
                                className="border rounded-md px-2 shadow-sm"
                              >
                                Hủy
                              </button>
                            </div>
                          </div>
                          {/* Add other editable fields as needed */}
                        </form>
                      </div>
                    </td>
                  </tr>
                )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

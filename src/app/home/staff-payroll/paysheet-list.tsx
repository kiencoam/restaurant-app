//lỗi update status và payment method
import { PageInfo } from "@/app/api-client/PageInfo";
import {
  asyncCalculateSalaryPeriod,
  paymentSalaryPeriod,
  PaymentSalaryPeriodRequest,
  SalaryPeriodEntity,
  updateSalaryPeriodStatus,
  UpdateSalaryPeriodStatusRequest,
} from "@/app/api-client/SalaryPeriodService";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { GetSalaryDetailRequest, GetSalaryPeriodRequest } from "./page";
import {
  getAllSalaryDetails,
  PaymentSalaryDetailRequest,
  SalaryDetailEntity,
} from "@/app/api-client/SalaryDetailService";
import { SalaryDetailStatusEnum } from "@/app/constants/SalaryDetailStatusEnum";
import { SalaryPeriodStatusEnum } from "@/app/constants/SalaryPeriodStatusEnum";
import {
  formatDateToString,
  formatTimeToYYYYMMDDTHHMM,
} from "@/utils/timeUtils";

type PaysheetListProps = {
  salaryPeriods: SalaryPeriodEntity[];
  setSalaryPeriods: React.Dispatch<React.SetStateAction<SalaryPeriodEntity[]>>;
  masterChecked: boolean;
  checkedRows: Record<number, boolean>;
  pageInfo: PageInfo;
  handleMasterCheckboxChange: () => void;
  handleRowCheckboxChange: (id: number) => void;
  handleRowClick: (id: number) => void;
  expandedRow: number | null;
  handlePageSizeChange: (pageSize: number) => void;
  handlePageNumberChange: (page: number) => void;
  setPeriodFilter: React.Dispatch<React.SetStateAction<GetSalaryPeriodRequest>>;
};

export default function PaysheetList({
  salaryPeriods,
  setSalaryPeriods,
  masterChecked,
  checkedRows,
  handleMasterCheckboxChange,
  handleRowCheckboxChange,
  handleRowClick,
  expandedRow,
  setPeriodFilter,
}: PaysheetListProps) {
  //FOR PERIOD
  const [status, setStatus] = useState("");

  //FOR DETAIL
  const [salaryDetails, setSalaryDetails] = useState<SalaryDetailEntity[]>([]);

  const [detailFilter, setDetailFilter] = useState<GetSalaryDetailRequest>({
    page: 0,
    page_size: 5,
  });

  const [updatedSalaryPeriod, setUpdatedSalaryPeriod] =
    useState<PaymentSalaryPeriodRequest>({
      paymentMethod: "CASH",
      note: "",
      paymentSalaryDetails: [] as PaymentSalaryDetailRequest[],
    });

  const [currentDetailPage, setCurrentDetailPage] = useState(1);

  const [rowsPerDetailPage, setRowsPerDetailPage] = useState(5);

  const [detailPageInfo, setDetailPageInfo] = useState<PageInfo>({
    totalPage: null,
    totalRecord: null,
    pageSize: null,
    nextPage: null,
    previousPage: null,
  });

  //For DETAIL

  const handlePaidSalaryChange = (
    salaryPeriodId,
    salaryDetailId,
    newValue,
    paymentMethod = null
  ) => {
    setUpdatedSalaryPeriod((prevPaysheets) => {
      let updatedDetails = (prevPaysheets.paymentSalaryDetails || []).map(
        (detail) =>
          detail.salaryDetailId === salaryDetailId
            ? { ...detail, paidSalary: newValue }
            : detail
      );

      // if (
      //   !updatedDetails.some(
      //     (detail) => detail.salaryDetailId === salaryDetailId
      //   )
      // ) {
      //   updatedDetails = [
      //     ...updatedDetails,
      //     { salaryDetailId: salaryDetailId, paidSalary: newValue },
      //   ];
      // }

      return {
        ...prevPaysheets,
        paymentSalaryDetails: updatedDetails,
        ...(paymentMethod !== null && { paymentMethod }),
      };
    });
  };

  const changeDetailPage = (newPage) => {
    if (newPage >= 1 && newPage <= detailPageInfo.totalPage) {
      setCurrentDetailPage(newPage);
      handleDetailPageNumberChange(newPage - 1);
    }
  };

  //Handle rowsPerPage change
  const changeRowsPerDetailPage = (pageSize) => {
    setRowsPerDetailPage(pageSize);
    handleDetailPageSizeChange(pageSize);
  };

  const handleDetailPageSizeChange = (value: number) => {
    setDetailFilter({
      ...detailFilter,
      page_size: value,
      page: 0,
    });
  };

  const handleDetailPageNumberChange = (value: number) => {
    setDetailFilter({
      ...detailFilter,
      page: value,
    });
  };

  //Lấy tất cả SalaryDetails
  useEffect(() => {
    const query = Object.entries(detailFilter)
      .map(([key, value]) => {
        if (value) {
          return `${key}=${value}`;
        }
      })
      .join("&");
    if (detailFilter.salary_period_id) {
      getAllSalaryDetails(query).then((data) => {
        setSalaryDetails(data.second);
        setDetailPageInfo(data.first);
        console.log(data.second);
      });
    }
  }, [detailFilter]);

  const handleSubmit = (paysheetId) => {
    paymentSalaryPeriod(paysheetId, updatedSalaryPeriod).then((res) => {
      console.log("payment", res);
      updateSalaryPeriodStatus(paysheetId, { status: "DONE" }).then((res) => {
        console.log("status:", res);
        setDetailFilter((prev) => ({ ...prev }));
        setPeriodFilter((prev) => ({ ...prev }));
      });
    });
  };

  // const handleAsyncCalculate = (id) => {
  //   asyncCalculateSalaryPeriod(id).then((res) => {
  //     setSalaryPeriods((prev) =>
  //       prev.map((item) => (item.id === id ? { ...item, ...res } : item))
  //     );
  //     console.log("async", res);
  //   });
  // };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 mt-6">
        <thead>
          <tr className="bg-[#f7fafc] border-b-2">
            <th className="px-4 py-2 border-b text-left">
              <input
                type="checkbox"
                checked={masterChecked}
                onChange={handleMasterCheckboxChange}
              />
            </th>
            <th className="px-4 py-2 border-b text-left">Mã</th>
            <th className="px-4 py-2 border-b text-left">Tên</th>
            <th className="px-4 py-2 border-b text-left">Kỳ làm việc</th>
            <th className="px-4 py-2 border-b text-left">Tổng lương</th>
            <th className="px-4 py-2 border-b text-left">Đã trả</th>
            <th className="px-4 py-2 border-b text-left">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {salaryPeriods.map((paysheet) => (
            <React.Fragment key={paysheet.id}>
              <tr
                key={paysheet.id}
                className={` border-b-2 cursor-pointer ${
                  checkedRows[paysheet.id] ? "bg-gray-100" : ""
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
                  handleRowClick(paysheet.id); // Expand or collapse row
                  setPeriodFilter((prev) => ({ ...prev }));
                  setDetailFilter((prev) => ({
                    ...prev,
                    salary_period_id: paysheet.id,
                  }));
                  setUpdatedSalaryPeriod((prev) => ({
                    ...prev,
                    paymentMethod:
                      paysheet.salaryDetails[0].paymentMethod ||
                      prev.paymentMethod,
                    paymentSalaryDetails: paysheet.salaryDetails.map(
                      (prev) => ({
                        salaryDetailId: prev.id,
                        paidSalary: prev.paidSalary,
                      })
                    ),
                  }));
                }}
              >
                <td className="px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    checked={!!checkedRows[paysheet.id]}
                    onChange={() => handleRowCheckboxChange(paysheet.id)}
                  />
                </td>
                <td className="px-4 py-2 border-b">{paysheet.code}</td>
                <td className="px-4 py-2 border-b max-w-[230px] w-[230px] truncate">
                  {paysheet.title}
                </td>
                <td className="px-4 py-2 border-b">
                  {paysheet.fromDate} - {paysheet.toDate}
                </td>
                <td className="px-4 py-2 border-b">{paysheet.totalSalary}</td>
                <td className="px-4 py-2 border-b">{paysheet.paidSalary}</td>
                <td className="px-4 py-2 border-b">
                  {paysheet.status === "PROCESSING"
                    ? "Tạm tính"
                    : "Đã chốt lương"}
                </td>
              </tr>
              {expandedRow === paysheet.id && (
                <tr>
                  <td colSpan={7} className="bg-gray-50 p-4">
                    {/* Detailed information and editable fields */}
                    <div>
                      <form className="space-y-4">
                        <div className="flex space-x-12">
                          <div className="space-y-6">
                            <div className="flex space-x-12">
                              <label className="w-52">
                                Mã
                                <input
                                  type="text"
                                  value={paysheet.code}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                />
                              </label>
                              <label className="w-52">
                                Tổng số nhân viên
                                <input
                                  type="text"
                                  value={paysheet.salaryDetails.length}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                />
                              </label>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-12">
                                <label className="w-52">
                                  Tên
                                  <input
                                    type="text"
                                    value={paysheet.title}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                                <label className="w-52">
                                  Tổng lương
                                  <input
                                    type="text"
                                    value={paysheet.totalSalary}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-12">
                                <label className="w-52">
                                  Kỳ làm việc
                                  <input
                                    type="text"
                                    value={
                                      paysheet.fromDate +
                                      " - " +
                                      paysheet.toDate
                                    }
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                                <label className="w-52">
                                  Đã trả
                                  <input
                                    type="text"
                                    value={paysheet.paidSalary}
                                    className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                    disabled
                                  />
                                </label>
                              </div>
                            </div>

                            <div className="flex space-x-12">
                              <label className="w-52">
                                Trạng thái
                                <select
                                  value={paysheet.status}
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled
                                >
                                  <option value="PROCESSING">Tạm tính</option>
                                  <option value="DONE">Đã chốt lương</option>
                                </select>
                              </label>
                              <label className="w-52">
                                Hình thức thanh toán
                                <select
                                  value={updatedSalaryPeriod.paymentMethod}
                                  onChange={(e) =>
                                    handlePaidSalaryChange(
                                      paysheet.id,
                                      null,
                                      null,
                                      e.target.value
                                    )
                                  }
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                                  disabled={paysheet.status === "DONE"}
                                >
                                  <option value="CASH">Tiền mặt</option>
                                  <option value="BANK">Chuyển khoản</option>
                                </select>
                              </label>
                            </div>

                            {/* Add other editable fields as needed */}
                          </div>
                          <div className="w-full">
                            <div>
                              <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                  <tr className="bg-[#f7fafc] border-b-2">
                                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                                      Mã phiếu
                                    </th>
                                    <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                                      Tên nhân viên
                                    </th>
                                    <th className="px-4 py-2 border-b text-right w-[140px] text-sm font-semibold text-gray-700">
                                      Tổng lương
                                    </th>
                                    <th className="px-4 py-2 border-b text-right w-[140px] text-sm font-semibold text-gray-700">
                                      Đã trả NV
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {salaryDetails.map((salaryDetail) => (
                                    <tr
                                      key={salaryDetail.id}
                                      className="hover:bg-gray-50"
                                    >
                                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                                        {salaryDetail.code}
                                      </td>
                                      <td className="px-4 py-2 border-b text-sm text-gray-700">
                                        {salaryDetail.userName}
                                      </td>
                                      <td className="px-4 py-2 border-b text-right text-sm text-gray-700">
                                        {salaryDetail.totalSalary.toLocaleString()}
                                        ₫
                                      </td>
                                      <td className="px-4 py-2 border-b text-right text-sm">
                                        <input
                                          type="text"
                                          value={
                                            salaryDetail.status !== "PAID"
                                              ? updatedSalaryPeriod.paymentSalaryDetails.find(
                                                  (it) =>
                                                    it.salaryDetailId ===
                                                    salaryDetail.id
                                                )?.paidSalary
                                              : salaryDetail.paidSalary
                                          }
                                          onChange={(e) =>
                                            handlePaidSalaryChange(
                                              paysheet.id,
                                              salaryDetail.id,
                                              e.target.value
                                            )
                                          }
                                          disabled={paysheet.status === "DONE"}
                                          className="w-full border rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 text-right"
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="flex items-center space-x-8 mt-4">
                              <div className="flex">
                                <div>Số nhân viên: </div>
                                <select
                                  className="bg-[#f7f7f7] outline-none"
                                  value={rowsPerDetailPage}
                                  onChange={(e) => {
                                    changeRowsPerDetailPage(
                                      Number(e.target.value)
                                    );
                                    setCurrentDetailPage(1);
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
                                  type="button"
                                  onClick={() => {
                                    changeDetailPage(currentDetailPage - 1); // Cập nhật số trang
                                    setDetailFilter((prevParams) => ({
                                      ...prevParams, // Giữ lại các tham số cũ
                                      page: currentDetailPage - 2, // Cập nhật page theo currentPage - 1
                                    }));
                                  }}
                                  disabled={currentDetailPage === 1}
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
                                {salaryDetails.length > 0 && (
                                  <span>
                                    Page{" "}
                                    {Math.min(
                                      currentDetailPage,
                                      detailPageInfo.totalPage
                                    )}{" "}
                                    of {detailPageInfo.totalPage}
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    changeDetailPage(currentDetailPage + 1); // Cập nhật số trang
                                    setDetailFilter((prevParams) => ({
                                      ...prevParams, // Giữ lại các tham số cũ
                                      page: currentDetailPage, // Cập nhật page theo currentPage + 1
                                    }));
                                  }}
                                  disabled={
                                    currentDetailPage ===
                                    detailPageInfo.totalPage
                                  }
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
                        <div className="flex pt-2 items-center space-x-4">
                          <div>
                            Dữ liệu được tải lại vào:
                            <span className="font-bold">
                              {" "}
                              {formatDateToString(new Date())}
                            </span>
                          </div>
                          <button
                            type="button"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Tải lại bảng lương để xem dữ liệu mới nhất"
                            // onClick={() => handleAsyncCalculate(paysheet.id)}
                          >
                            <Tooltip id="my-tooltip" />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#000000"
                            >
                              <path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex justify-end ">
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              onClick={() => {
                                handleSubmit(paysheet.id);
                                handleRowClick(paysheet.id);
                              }}
                              className="border rounded-md px-2 shadow-sm bg-black text-white"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={() => handleRowClick(paysheet.id)}
                              className="border rounded-md px-2 shadow-sm"
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
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

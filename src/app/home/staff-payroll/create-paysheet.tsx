import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { createSalaryPeriod, CreateSalaryPeriodRequest } from "@/app/api-client/SalaryPeriodService";
import { GetSalaryPeriodRequest } from "./page";
import { formatDateToYYYYMMDD } from "@/utils/timeUtils";


type Props = {
  toggleNewPaysheet: () => void;
  setPeriodFilter: React.Dispatch<React.SetStateAction<GetSalaryPeriodRequest>>;
};

export default function CreatePaysheet({ toggleNewPaysheet, setPeriodFilter }: Props) {
  const [newSalaryPeriod, setNewSalaryPeriod] = useState<CreateSalaryPeriodRequest>({
    title: "",
    fromDate: null,
    toDate: null,
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);


  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSalaryPeriod({ ...newSalaryPeriod, title: event.target.value });
  };


  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    setNewSalaryPeriod({
      ...newSalaryPeriod,
      fromDate: date ? formatDateToYYYYMMDD(date) : null,
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    setNewSalaryPeriod({
      ...newSalaryPeriod,
      toDate: date ? formatDateToYYYYMMDD(date) : null,
    });
  };



  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("new", newSalaryPeriod)
    if (!newSalaryPeriod.title || !newSalaryPeriod.fromDate || !newSalaryPeriod.toDate) {
      alert("Vui lòng điền đầy đủ thông tin trước khi lưu!");
      return;
    }
    createSalaryPeriod(newSalaryPeriod).then((res) => {
      console.log("Submitting salary period:", res);
      setPeriodFilter(prev => ({ ...prev }));
    })

    toggleNewPaysheet();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f7fafc] p-8 rounded-lg shadow-lg w-2/5">
        <div className="text-2xl font-bold mb-6 text-center">Thêm bảng tính lương</div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Tên</label>
            <input
              type="text"
              value={newSalaryPeriod.title}
              onChange={handleTitleChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Nhập tên bảng lương"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">Kỳ làm việc</label>
            <div className="flex space-x-2 w-full"> {/* Using flex and space-x-2 for spacing */}
              <DatePicker
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-full"
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Ngày bắt đầu"
                isClearable
              />
              <DatePicker
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black w-full"
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Ngày kết thúc"
                isClearable
              />
            </div>
          </div>




          {/* Optional: Scope of application (Commented for now) */}
          {/* <div className="flex space-x-12 items-center">
            <div className="bg-gray-50 w-32">Phạm vi áp dụng</div>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                className="form-radio"
                name="scale"
                onChange={() => changeScalePayFunction("ALL")}
              />
              <span>Tất cả</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                className="form-radio"
                name="scale"
                onChange={() => changeScalePayFunction("OPTIONAL")}
              />
              <span>Tùy chọn</span>
            </label>
          </div>
          {scalePay == "OPTIONAL" && (
            <div>
              <ReactSelect
                options={userOptions}
                onChange={handleUserChange}
                onInputChange={(inputValue) => setSearchUser(inputValue)}
                value={userOptions.find(
                  (option) => option.value === newPaysheet.id
                )}
                isMulti={true}
                placeholder="Tìm nhân viên"
                noOptionsMessage={() =>
                  searchUser ? "Không tìm thấy nhân viên" : "Nhập để tìm kiếm"
                }
                components={{ DropdownIndicator }}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "transparent", // No background color
                    borderColor: "#e4e6eb", // No border color
                    outline: "#a4a6a5", // No outline on focus
                    boxShadow: "none", // Remove default box shadow
                    width: "100%", // Adjust this width as needed
                    "&:hover": {
                      borderColor: "#a4a6a5", // Prevent border on hover
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    width: "100%", // Match the menu width
                  }),
                  option: (base) => ({
                    ...base,
                    width: "100%", // Match options to component width
                  }),
                }}
              />
            </div>
          )} */}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md shadow hover:bg-gray-800"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={toggleNewPaysheet}
              className="px-4 py-2 bg-gray-200 text-black rounded-md shadow hover:bg-gray-300"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

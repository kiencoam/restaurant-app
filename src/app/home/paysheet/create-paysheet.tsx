import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactSelect from "react-select";

export default function CreatePaysheet({
  toggleNewPaysheet,
  filterUser,
  searchUser,
  setSearchUser,
  newPaysheet,
  setNewPaysheet,
}) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [scalePay, changeScalePay] = useState("ALL");

  const changeScalePayFunction = (value) => {
    changeScalePay(value); // Update the scalePay state
  };

  const userOptions = filterUser.map((user) => ({
    value: user.id,
    label: user.name + " - " + user.position,
  }));

  const handleUserChange = (selectedOption) => {
    setNewPaysheet({
      ...newPaysheet,
      customerId: selectedOption ? selectedOption.value : null,
    });
  };

  const DropdownIndicator = null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f7fafc] p-6 rounded-lg shadow-lg w-3/5 h-6/10">
        <div className="text-xl font-bold mb-12">Thêm bảng tính lương</div>
        <form className="space-y-8">
          <div className="flex space-x-12 items-center">
            <div className="bg-gray-50 w-32">Tên</div>
            <input className="border-b-2 focus:border-b-black outline-none bg-[#f7fafc]"></input>
          </div>
          <div className="flex space-x-12 items-center">
            <div className="bg-gray-50 w-32">Kỳ làm việc</div>
            <DatePicker
              className="border-b-2 focus:border-b-black w-60 outline-none bg-[#f7fafc]"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              dateFormat="dd/MM/yyyy"
              isClearable={true}
            />
          </div>
          <div className="flex space-x-12 items-center">
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
          )}
          <div className="flex justify-end gap-4 items-center mt-4">
            <button
              className="flex pl-2 items-center border rounded-md bg-black "
              onClick={toggleNewPaysheet}
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
            <button className="p-2 rounded right-0" onClick={toggleNewPaysheet}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

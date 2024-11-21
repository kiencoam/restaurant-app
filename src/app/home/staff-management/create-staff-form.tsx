import { Tooltip } from "react-tooltip";
import CreateAccountForm from "./create-account-form";

export default function CreateStaffForm({
  toggleNewStaff,
  toggleNewAccount,
  isNewAccount,
  setIsNewAccount,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f7fafc] p-6 rounded-lg shadow-lg w-3/5 h-6/10">
        <div className="text-xl font-bold mb-4">Thêm nhân viên</div>
        <form className="space-y-4">
          <div className="flex space-x-12">
            <label className="w-64">
              Mã nhân viên
              <input
                type="text"
                placeholder="Mã nhân viên tự động"
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
              />
            </label>
            <label className="w-64">
              Email
              <input
                type="text"
                className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
              />
            </label>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-12">
              <label className="w-64">
                Tên nhân viên
                <input
                  type="text"
                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                />
              </label>
              <label className="w-64">
                Điện thoại
                <input
                  type="text"
                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-12">
              <label className="w-64">
                Ngày sinh
                <input
                  type="text"
                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                />
              </label>
              <label className="w-64">
                Địa chỉ
                <input
                  type="text"
                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-12">
              <label className="w-64">
                Loại lương
                <select className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black">
                  <option value="HOURLY">Theo giờ</option>
                  <option value="DAYLY">Theo ngày</option>
                </select>
              </label>
              <label className="w-64">
                Lương theo giờ
                <input
                  type="text"
                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-12">
              <label className="w-64">
                Ghi chú
                <input
                  type="text"
                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                />
              </label>
              <label className="w-64">
                Lương theo tháng
                <input
                  type="text"
                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-12">
              <label className="w-64 focus:border-b-black">
                Tài khoản đăng nhập
                <div className="flex items-center">
                  <input
                    type="text"
                    className="w-[232px] border-b-2 bg-gray-50 mt-2 outline-none"
                    
                  />
                  <Tooltip id="my-tooltip" />
                  <button
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Tạo tài khoản mới"
                    type="button"
                    onClick={() => setIsNewAccount(!isNewAccount)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="34px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                      className="border-b-2"
                    >
                      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                  </button>
                  {isNewAccount && (
                    <CreateAccountForm toggleNewAccount={toggleNewAccount} />
                  )}
                </div>
              </label>

              <label className="w-64">
                Trạng thái
                <select className="w-full border-b-2 bg-gray-50 mt-2 outline-none focus:border-b-black">
                  <option value="IN">Đang làm việc</option>
                  <option value="OUT">Đã nghỉ</option>
                </select>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-4 items-center mt-4">
            <button
              className="flex pl-2 items-center border rounded-md bg-black "
              onClick={toggleNewStaff}
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
            <button className="p-2 rounded right-0" onClick={toggleNewStaff}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function CreateAccountForm({ toggleNewAccount }) {
  const [isCharsVisible, changeCharsVisibility] = useState(false);

  const toggleCharsVisibility = () => {
    changeCharsVisibility(!isCharsVisible);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-6/10">
        <div className="text-xl font-bold mb-4">Thêm tài khoản</div>
        <form className="space-y-4">
          <div className="flex space-x-12">
            <label className="w-64">
              Tài khoản
              <input
                type="text"
                className="w-full border-b-2 bg-none mt-2 outline-none focus:border-b-black"
              />
            </label>
            <label className="w-64">
              Mật khẩu
              <div className="flex">
                <input
                  type={isCharsVisible ? "text" : "password"}
                  className="w-full border-b-2 bg-none mt-2 outline-none"
                />
                <button type="button" className="border-b-2" onClick={toggleCharsVisibility}>
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
                Vai trò
                <select className="w-full border-b-2 bg-none mt-2 outline-none focus:border-b-black">
                  <option value="ADMIN">ADMIN</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="WAITER">WAITER</option>
                  <option value="CHEF">CHEF</option>
                  <option value="CASHIER">CASHIER</option>
                </select>
              </label>
              <label className="w-64">
                Nhập lại mật khẩu
                <input
                  type="password"
                  className="w-full border-b-2 bg-none mt-2 outline-none focus:border-b-black"
                />
              </label>
            </div>
          </div>
        </form>
        <div className="flex justify-end gap-3 items-center mt-4">
          <button
            className="flex pl-2 items-center border rounded-md bg-black "
            onClick={toggleNewAccount}
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
          <button className="p-2 rounded right-0" onClick={toggleNewAccount}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

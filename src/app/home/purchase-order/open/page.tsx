"use client";
import React, { useRef, useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import Link from "next/link";

// Mock data for table rows
const initialTableData = [
  {
    id: 1,
    productCode: "SP000008",
    productName: "Đĩa thịt nguội Tây Ba Nha hảo hạng",
    quantity: 1,
    pricePerUnit: 100500,
    totalValue: 0,
  },
  {
    id: 2,
    productCode: "SP000009",
    productName: "Pho mát Pháp loại đặc biệt",
    quantity: 2,
    pricePerUnit: 200000,
    totalValue: 0,
  },
  {
    id: 3,
    productCode: "SP000010",
    productName: "Trái cây nhập khẩu cao cấp",
    quantity: 1,
    pricePerUnit: 100500,
    totalValue: 0,
  },
];

const OpenPage = () => {
  const [tableData, setTableData] = useState(initialTableData);
  const [isAddingNewOpen, setIsAddingNewOpen] = useState(false);

  const handlePriceForUnitChange = (id, newPricePerUnit) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, pricePerUnit: Math.max(0, newPricePerUnit) }
          : item
      )
    );
  };

  const calculateTotal = (pricePerUnit, quantity) => {
    return pricePerUnit * quantity;
  };

  const handleQuantityChange = (id, newQuantity) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(0, newQuantity), // Ensure quantity stays within range
            }
          : item
      )
    );
  };

  const toggleAddingNewOpen = () => {
    setIsAddingNewOpen(!isAddingNewOpen);
  };

  // Calculate total price of all items
  const totalAmount = tableData.reduce(
    (sum, item) => sum + calculateTotal(item.pricePerUnit, item.quantity),
    0
  );

  return (
    <div className="flex w-full h-screen font-nunito bg-[#f7f7f7]">
      {/* Left section for table and search bar */}
      <div className="p-6">
        <div className="flex items-center gap-2 ">
          <Link href="/home/purchase-order/">
            <button
              className="hover:bg-gray-400"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Trở về"
            >
              <Tooltip id="my-tooltip" />
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
          </Link>
          <div className="text-2xl font-bold w-[180px]">Nhập hàng</div>
          <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[450px]">
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
              className="p-2 bg-transparent outline-none w-full"
              type="text"
              placeholder="Tìm hàng hóa theo mã hoặc theo tên"
            />
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Thêm hàng hóa mới"
              onClick={toggleAddingNewOpen}
            >
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
            {isAddingNewOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-6/10">
                <div className="text-xl font-bold mb-4">Thêm hàng hóa</div>
                <div className="flex pt-3">
                  <div className="flex items-center gap-3">
                    <div className="px-2 py-4 w-28">Mã hàng hóa</div>
                    <input
                      className="border-b-2 focus:border-b-black w-64 h-fit outline-none"
                      placeholder="Mã tự động sinh"
                    ></input>
                  </div>
                  <div className="flex items-center gap-3 pl-3">
                    <div className="px-2 py-4">Giá vốn</div>
                    <input className="border-b-2 focus:border-b-black outline-none w-40 h-fit"></input>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex items-center gap-3">
                    <div className="px-2 py-4 w-28">Tên hàng</div>
                    <input className="border-b-2 focus:border-b-black outline-none w-64 h-fit"></input>
                  </div>
                  <div className="flex items-center gap-3 pl-3">
                    <div className="px-2 py-4">Giá bán</div>
                    <input className="border-b-2 focus:border-b-black outline-none w-40 h-fit"></input>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-2 py-4 w-28">Loại hàng</div>
                  <select className="w-64 h-fit border-b-2 focus:border-b-black outline-none">
                    <option selected>Chọn loại hàng</option>
                    <option value="Type1">Type1</option>
                    <option value="Type2">Type2</option>
                    <option value="Type3">Type3</option>
                    <option value="Type4">Type4</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 items-center mt-4">
                  <button
                    className="flex pl-2 items-center border rounded-md bg-black "
                    onClick={toggleAddingNewOpen}
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
                    onClick={toggleAddingNewOpen}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full border mt-6">
          <thead className="bg-[#f7fafc] text-[13px]">
            <tr>
              <th className="px-4 py-2 text-left">STT</th>
              <th className="px-4 py-2 text-left w-[110px]">Mã hàng hóa</th>
              <th className="px-4 py-2 text-left">Tên hàng</th>
              <th className="px-4 py-2 text-right w-[98px]">Số lượng</th>
              <th className="px-4 py-2 text-right w-[120px]">Đơn giá</th>
              <th className="px-4 py-2 text-right w-[120px]">Thành tiền</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {tableData.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{item.productCode}</td>
                <td className="px-4 py-2">{item.productName}</td>
                <td className="px-4 py-2 text-center">
                  {/* Input for quantity to return */}
                  <input
                    min="0"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                    className="w-full mb-[20px] text-right  p-1 border-b-2  outline-none bg-none focus:border-b-black"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  {/* Input for price per unit */}
                  <input
                    min="0"
                    value={item.pricePerUnit}
                    onChange={(e) =>
                      handlePriceForUnitChange(
                        item.id,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full mb-[20px] text-right p-1 border-b-2  outline-none focus:border-b-black"
                  />
                </td>
                <td className="px-4 pt-2 pb-[26px] text-right">
                  {calculateTotal(
                    item.pricePerUnit,
                    item.quantity
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right section for detailed information */}
      <div className="w-[360px] p-6 mr-6 mt-6  bg-white text-[13px] h-3/5">
        <div className="text-right text-gray-500 mb-4">08/11/2024 08:38</div>
        <div className="mb-4">
          <label className="text-gray-700">Nhà cung cấp</label>
          <div className="text-lg font-semibold">Đại lý Hồng Phúc</div>
        </div>
        <div className="flex mb-4 justify-between">
          <label className="text-gray-700">Mã phiếu nhập</label>
          <input
            className="border-b-2  w-[140px]  outline-none focus:border-b-black"
            placeholder="Mã phiếu tự động"
            value="Từ id purchase-order"
            disabled
          />
        </div>
        <div className="flex mb-4 justify-between">
          <label className="text-gray-700">Trạng thái</label>
          <div className=" font-semibold">Phiếu tạm</div>
        </div>
        <div className="flex justify-between mb-4">
          <label className="text-gray-700">Tổng tiền hàng</label>
          <div className="font-semibold">{totalAmount.toLocaleString()}</div>
        </div>
        <div className="flex mb-4 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
          <textarea
            className="border-b-2 outline-none w-full focus:border-b-black"
            placeholder="Ghi chú"
          />
        </div>
        <div className="flex justify-between mt-20">
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-[130px]">
            Lưu tạm
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded w-[130px]">
            Hoàn thành
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenPage;

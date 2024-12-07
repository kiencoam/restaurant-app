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
    purchasedQuantity: 1,
    purchasePrice: 100500,
    returnPrice: 0,
    returnQuantity: 0,
  },
  {
    id: 2,
    productCode: "SP000009",
    productName: "Pho mát Pháp loại đặc biệt",
    purchasedQuantity: 3,
    purchasePrice: 200000,
    returnPrice: 0,
    returnQuantity: 0,
  },
  {
    id: 3,
    productCode: "SP000010",
    productName: "Trái cây nhập khẩu cao cấp",
    purchasedQuantity: 5,
    purchasePrice: 150000,
    returnPrice: 0,
    returnQuantity: 0,
  },
];

const ReturnPage = () => {
  const [tableData, setTableData] = useState(initialTableData);

  const amountSupplierPaidRef = useRef<HTMLInputElement>(null);
  const debtAdjustmentRef = useRef<HTMLInputElement>(null); // This will hold the calculated "Tính vào công nợ" value

  const handleQuantityChange = (id, newQuantity) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              returnQuantity: Math.min(
                Math.max(0, newQuantity),
                item.purchasedQuantity
              ), // Ensure quantity stays within range
            }
          : item
      )
    );
  };

  const handleReturnPriceChange = (id, newReturnPrice) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, returnPrice: Math.max(0, newReturnPrice) }
          : item
      )
    );
  };

  const calculateTotal = (returnPrice, returnQuantity) => {
    return returnPrice * returnQuantity;
  };

  // Calculate total price of all items
  const totalAmount = tableData.reduce(
    (sum, item) => sum + calculateTotal(item.returnPrice, item.returnQuantity),
    0
  );

  const calculateDebtAdjustment = () => {
    const supplierDue = totalAmount;
    const amountSupplierPaid =
      parseFloat(amountSupplierPaidRef.current?.value) || 0;

    if (debtAdjustmentRef.current) {
      debtAdjustmentRef.current.value = (
        amountSupplierPaid - supplierDue
      ).toString();
    }
  };

  useEffect(() => {
    calculateDebtAdjustment();
  }, [totalAmount]);

  return (
    <div className="flex w-full h-screen font-nunito bg-[#f7f7f7]">
      {/* Left section for table and search bar */}
      <div className="p-6">
        <div className="flex items-center gap-2 ">
        <Link href = "/home/purchase-return/">
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
          <div className="text-2xl font-bold w-[180px]">Trả hàng nhập</div>
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
              <th className="px-4 py-2 text-right w-[120px]">Giá nhập</th>
              <th className="px-4 py-2 text-right w-[120px]">Giá trả lại</th>
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
                    max={item.purchasedQuantity}
                    value={item.returnQuantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                    className="w-full text-right  p-1 border-b-2  outline-none bg-none focus:border-b-black"
                  />
                  <div className="text-sm text-right text-gray-500">
                    / {item.purchasedQuantity}
                  </div>
                </td>
                <td className="px-4 pt-2 pb-[26px]  text-right ">
                  {item.purchasePrice.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right">
                  {/* Input for return price */}
                  <input
                    min="0"
                    value={item.returnPrice}
                    onChange={(e) =>
                      handleReturnPriceChange(
                        item.id,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full mb-[20px] text-right p-1 border-b-2  outline-none focus:border-b-black"
                  />
                </td>
                <td className="px-4 pt-2 pb-[26px] text-right">
                  {calculateTotal(
                    item.returnPrice,
                    item.returnQuantity
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right section for detailed information */}
      <div className="w-[360px] p-6 mr-6 mt-6  bg-white text-[13px] h-3/4">
        <div className="text-right text-gray-500 mb-4">08/11/2024 08:38</div>
        <div className="mb-4">
          <label className="text-gray-700">Nhà cung cấp</label>
          <div className="text-lg font-semibold">Đại lý Hồng Phúc</div>
        </div>
        <div className="flex mb-4 justify-between">
          <label className="text-gray-700">Mã trả hàng nhập</label>
          <input
            className="border-b-2  w-[140px]  text-gray-500 outline-none focus:border-b-black"
            placeholder="Mã phiếu tự động"
          />
        </div>
        <div className="flex mb-4 justify-between">
          <label className="text-gray-700">Trạng thái</label>
          <div className=" font-semibold">Phiếu tạm</div>
        </div>
        <div className="flex justify-between mb-4">
          <label className="text-gray-700">Tổng tiền hàng</label>
          <div>{totalAmount.toLocaleString()}</div>
        </div>

        <div className="flex justify-between mb-4">
          <label className="text-gray-700">NCC cần trả</label>
          <div className="font-semibold">{totalAmount.toLocaleString()}</div>
        </div>
        <div className="flex justify-between mb-4">
          <label className="text-gray-700">Tiền NCC trả</label>
          <input
            className="border-b-2 w-[140px] text-right outline-none focus:border-b-black"
            placeholder="Nhập số tiền"
            ref={amountSupplierPaidRef}
            onChange={calculateDebtAdjustment}
          />
        </div>
        <div className="flex justify-between mb-4">
          <label className="text-gray-700">Tính vào công nợ</label>
          <input
            className="border-b-2 w-[140px] text-right outline-none"
            ref={debtAdjustmentRef}
            readOnly
          />
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
            Trả hàng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnPage;

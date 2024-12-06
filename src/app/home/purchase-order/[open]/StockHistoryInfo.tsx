import { StockHistoryEntity } from '@/app/api-client/StockHistoryService';
import React, { useState } from 'react';

interface StockHistoryInfoProps {
  totalAmount: number;
  handleUpdateStockHistory: (id: number, status: string, updatedStockHistory?: StockHistoryEntity) => void;
  stockHistory: StockHistoryEntity;
}

const StockHistoryInfo: React.FC<StockHistoryInfoProps> = ({ 
  totalAmount, 
  handleUpdateStockHistory, 
  stockHistory 
}) => {
  const [note, setNote] = useState(stockHistory.note || ""); // Lấy giá trị note ban đầu
  const [code, setCode] = useState(stockHistory.code || ""); // Lấy giá trị mã phiếu ban đầu
  const handleSaveNote = (status: string) => {
    const updatedStockHistory = { ...stockHistory, note, code };
    handleUpdateStockHistory(stockHistory.id, status, updatedStockHistory); // Truyền giá trị cập nhật
  };
  const date = new Date();
  const showTime =
    date.getDate() +
    "/" +
    (date.getMonth() + 1).toString() +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes();
  return (
    <div className="w-[360px] p-6 mr-6 mt-6 bg-white text-[13px] h-3/5">
      <div className="text-right text-gray-500 mb-4">{showTime}</div>
      <div className="mb-4">
        <label className="text-gray-700">Nhà cung cấp</label>
        <div className="text-lg font-semibold">{stockHistory.supplier.name}</div>
      </div>
      <div className="flex mb-4 justify-between">
        <label className="text-gray-700">Mã phiếu nhập</label>
        <input
          className="border-b-2 w-[140px] outline-none focus:border-b-black"
          value={code} // Lấy giá trị mã phiếu từ state
          onChange={(e) => setCode(e.target.value)} // Cập nhật khi người dùng thay đổi
          placeholder="Nhập mã phiếu"
        />
      </div>
      <div className="flex mb-4 justify-between">
        <label className="text-gray-700">Trạng thái</label>
        <div className="font-semibold">Phiếu tạm</div>
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
          value={note} // Giá trị hiện tại của ghi chú
          onChange={(e) => setNote(e.target.value)} // Cập nhật khi người dùng thay đổi
        />
      </div>
      <div className="flex justify-between mt-20">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-[130px]"
          onClick={() => handleSaveNote("Phiếu tạm")} // Lưu với trạng thái "Phiếu tạm"
        >
          Lưu tạm
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-[130px]"
          onClick={() => handleSaveNote("Hoàn thành")} // Lưu với trạng thái "Hoàn thành"
        >
          Hoàn thành
        </button>
      </div>
    </div>
  );
};

export default StockHistoryInfo;

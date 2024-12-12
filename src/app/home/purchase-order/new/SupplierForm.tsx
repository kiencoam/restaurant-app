"use client";
import { createSupplier, CreateSupplierRequest, SupplierEntity } from "@/app/api-client/SupplierService";
import React, { useState } from "react";

type Props = {
  toggleNewSupplier: () => void;
  setSuppliers: React.Dispatch<React.SetStateAction<SupplierEntity[]>>;
}

const SupplierForm = ({ toggleNewSupplier, setSuppliers }: Props) => {
  const [supplier, setSupplier] = useState<CreateSupplierRequest>({
    name: "",
    code: "",
    address: "",
    email: "",
    phoneNumber: "",
  })
  
  const handleSaveSupplier = async () => {

    createSupplier(supplier).then((res: SupplierEntity) => {
      console.log(res);
      setSuppliers((prev) => [res, ...prev]);
    })

    toggleNewSupplier();
  }

  console.log(supplier);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
    setSupplier({ ...supplier, [key]: e.target.value });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-6/10">
        <div className="font-bold mb-10 text-[20px]">Thêm nhà cung cấp</div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <div className="w-[140px] text-[15px]">Mã nhà cung cấp</div>
            <input 
              className="outline-none border-b-2 focus:border-b-black" 
              onChange={(e) => handleInputChange(e, "code")} 
            />
          </div>
          <div className="flex">
            <div className="w-[140px] text-[15px]">Email</div>
            <input 
              className="outline-none border-b-2 focus:border-b-black" 
              onChange={(e) => handleInputChange(e, "email")} 
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex">
            <div className="w-[140px] text-[15px]">Tên nhà cung cấp</div>
            <input 
              className="outline-none border-b-2 focus:border-b-black" 
              onChange={(e) => handleInputChange(e, "name")} 
            />
          </div>
          <div className="flex">
            <div className="w-[140px] text-[15px]">Điện thoại</div>
            <input 
              className="outline-none border-b-2 focus:border-b-black"
              onChange={(e) => handleInputChange(e, "phoneNumber")} 
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex">
            <div className="w-[140px] text-[15px]">Địa chỉ</div>
            <input 
              className="outline-none border-b-2 focus:border-b-black" 
              onChange={(e) => handleInputChange(e, "address")} 
            />
          </div>
          <div className="flex">
            <div className="w-[140px] text-[15px]">Ghi chú</div>
            <input className="outline-none border-b-2 focus:border-b-black" />
          </div>
        </div>
        <div className="flex justify-end mt-[40px] gap-3">
          <button
            className="flex pl-2 items-center border rounded-md bg-black"
            onClick={handleSaveSupplier}
          >
            <div className="p-2 text-white rounded right-0">Lưu</div>
          </button>
          <button className="p-2 rounded right-0" onClick={toggleNewSupplier}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierForm;

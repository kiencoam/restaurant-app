/*
  Gọi API tạo khách hàng mới ở dòng 30
*/

import {
  createCustomer,
  CreateCustomerRequest,
  CustomerEntity,
} from "@/app/api-client/CustomerService";
import React, { useState } from "react";

export default function CreateCustomerForm({
  customers,
  setCustomers,
  setIsNewCustomer,
}: {
  customers: CustomerEntity[];
  setCustomers: React.Dispatch<React.SetStateAction<CustomerEntity[]>>;
  setIsNewCustomer: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newCustomer, setNewCustomer] = useState<CreateCustomerRequest>({
    name: "",
    phoneNumber: "",
    address: "",
    email: "",
    dob: "",
    gender: "MALE",
  });

  const handleSaveCustomer = async () => {
    /* Gọi API */
    //const newCustomerEntity = await createCustomer(newCustomer);
    console.log(newCustomer);
    
    await createCustomer(newCustomer).then((res) => {
      console.log(res);
    })

    setIsNewCustomer(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={() => handleSaveCustomer()}
        className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-6/10"
      >
        <div className="text-xl font-bold mb-4">Thêm khách hàng</div>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="w-28">Mã khách hàng</div>
            <div className="flex items-center  text-sm bg-none w-[243.5px]">
              <input
                className="p-2 bg-transparent w-full outline-none border-b-2 focus:border-b-black"
                type="text"
                placeholder="Mã tự động"
                disabled
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>Điện thoại</div>
            <div className="flex items-center text-sm  bg-none w-[243.5px]">
              <input
                className="p-2 bg-transparent w-full outline-none border-b-2 focus:border-b-black invalid:border-b-red-500"
                type="text"
                placeholder="Ví dụ: 0912345678"
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    phoneNumber: e.target.value,
                  })
                }
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-3">
            <div className="w-28">Tên khách hàng</div>
            <div className="flex items-center  text-sm  bg-none  w-[243.5px]">
              <input
                className="p-2 bg-transparent w-full outline-none border-b-2 focus:border-b-black invalid:border-b-red-500"
                type="text"
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>Email</div>
            <div className="flex items-center text-sm bg-none w-[243.5px]">
              <input
                className="p-2 bg-transparent w-full outline-none border-b-2 focus:border-b-black invalid:border-b-red-500"
                type="email"
                placeholder="qwe@email.com"
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-3">
            <div className="w-28">Giới tính</div>
            <div className="flex items-center  text-sm  bg-none  w-[243.5px]">
              <select
                className="p-2 bg-transparent w-full outline-none border-b-2 focus:border-b-black"
                value={newCustomer.gender}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    gender: e.target.value,
                  })
                }
              >
                <option value={"MALE"}>Nam</option>
                <option value={"FEMALE"}>Nữ</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>Địa chỉ</div>
            <div className="flex items-center text-sm bg-none w-[243.5px]">
              <input
                className="p-2 bg-transparent w-full outline-none border-b-2 focus:border-b-black"
                type="text"
                value={newCustomer.address}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    address: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-3">
            <div className="w-28">Ngày sinh</div>
            <div className="flex items-center text-sm bg-none w-[243.5px]">
              <input
                className="p-2 bg-transparent w-full outline-none border-b-2 focus:border-b-black invalid:border-b-red-500"
                type="text"
                placeholder="dd/mm/yyyy"
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    dob: e.target.value,
                  })
                }
                pattern="\d{2}/\d{2}/\d{4}"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 items-center mt-4">
          <button
            type="submit"
            className="flex pl-2 items-center border-b-2 focus:border-b-black bg-black "
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
            onClick={() => setIsNewCustomer(false)}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

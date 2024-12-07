import { createCustomer, CreateCustomerRequest, CustomerEntity } from "@/app/api-client/CustomerService";
import { useState } from "react";

type Props = {
  setCustomers: React.Dispatch<React.SetStateAction<CustomerEntity[]>>;
  toggleNewCustomer: () => void;
}

export default function CreateCustomerForm({
  setCustomers,
  toggleNewCustomer,
}) {

  const [newCustomer, setNewCustomer] = useState<CreateCustomerRequest>({
    name: "",
    phoneNumber: "",
    address: "",
    email: "",
    dob: "",
    gender: "",
  })

  const handleNewCustomerChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    let newValue = e.target.value;

    if (field === 'gender') {
      // if (e.target.value !== 'Nam' && e.target.value !== 'Nữ') {
      //   alert('Giới tính chỉ có thể là Nam hoặc Nữ');
      //   return;
      // }

      if (e.target.value === 'Nam') {
        newValue = 'MALE';
      } else if (e.target.value === 'Nữ') {
        newValue = 'FEMALE';
      }
    }

    setNewCustomer({
      ...newCustomer,
      [field]: newValue,
    });
  }

  const handleCreateCustomer = async () => {
    console.log(newCustomer);
    try {
      createCustomer(newCustomer).then((res) => {
        setCustomers((prev) => [...prev, res]);
        toggleNewCustomer();
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f7fafc] p-6 rounded-lg shadow-lg w-3/5 h-6/10">
        <div className="text-xl font-bold mb-4">Thêm khách hàng</div>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="w-28">Mã khách hàng</div>
            <div className="flex items-center text-sm  bg-[#f7fafc] w-[243.5px]">
              <input
                className=" bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                type="text"
                placeholder="Mã mặc định"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>Email</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                type="text"
                placeholder="qwe@gmail.com"
                value={newCustomer.email}
                onChange={(e) => handleNewCustomerChange(e, "email")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-4">
            <div className="w-28">Tên khách hàng</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                type="text"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={newCustomer.name}
                onChange={(e) => handleNewCustomerChange(e, "name")}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>Điện thoại</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                type="text"
                placeholder="Ví dụ: 0912345678"
                value={newCustomer.phoneNumber}
                onChange={(e) => handleNewCustomerChange(e, "phoneNumber")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-4">
            <div className="w-28">Ngày sinh</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2"
                type="text"
                placeholder="dd/mm/yyyy"
                value={newCustomer.dob}
                onChange={(e) => handleNewCustomerChange(e, "dob")}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>Địa chỉ</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2"
                type="text"
                value={newCustomer.address}
                onChange={(e) => handleNewCustomerChange(e, "address")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-4">
            <div className="w-28">Giới tính</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2"
                type="text"
                placeholder="Nam/Nữ"
                onChange={(e) => handleNewCustomerChange(e, "gender")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 items-center mt-4">
          <button
            className="flex pl-2 items-center border rounded-md bg-black "
            onClick={toggleNewCustomer}
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
            <div onClick={handleCreateCustomer} className="p-2 text-white  rounded right-0">Lưu</div>
          </button>
          <button className="p-2 rounded right-0" onClick={toggleNewCustomer}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

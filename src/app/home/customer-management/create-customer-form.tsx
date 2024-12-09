import { createCustomer, CreateCustomerRequest, CustomerEntity } from "@/app/api-client/CustomerService";
import { useState } from "react";
import { GetCustomerRequest } from "./page";

type Props = {
  setCustomers: React.Dispatch<React.SetStateAction<CustomerEntity[]>>;
  toggleNewCustomer: () => void;
  pageSize: number;
  setFilter: React.Dispatch<React.SetStateAction<GetCustomerRequest>>;

}

export default function CreateCustomerForm({
  setCustomers,
  toggleNewCustomer,
  pageSize,
  setFilter
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

    // if (field === 'gender') {
    //   // if (e.target.value !== 'Nam' && e.target.value !== 'Nữ') {
    //   //   alert('Giới tính chỉ có thể là Nam hoặc Nữ');
    //   //   return;
    //   // }

    //   if (e.target.value === 'Nam') {
    //     newValue = 'MALE';
    //   } else if (e.target.value === 'Nữ') {
    //     newValue = 'FEMALE';
    //   }
    // }

    setNewCustomer({
      ...newCustomer,
      [field]: newValue,
    });
  }

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
    const newValue = e.target.value;

    setNewCustomer({
      ...newCustomer,
      [field]: newValue,
    });
  }
  const handleCreateCustomer = async () => {
    try {
      createCustomer(newCustomer).then((res) => {
        console.log("Customer created:", res);
        // setCustomers((prev) => {
        //   if (prev.length === pageSize) {
        //     return [res, ...prev.slice(0, prev.length - 1)];
        //   }
        //   return [res, ...prev];
        // });
        setFilter(prev => ({ ...prev })); // Kích hoạt useEffect
        toggleNewCustomer();
      })
    } catch (error) {
      console.log(error);
    }
  }
  // const handleCreateCustomer = async () => {
  //   console.log("Creating new customer:", newCustomer);
  //   try {
  //     // Kiểm tra xem createCustomer có trả về đúng Promise không
  //     const res = await createCustomer(newCustomer);
  //     console.log("Customer created:", res);

  //     setCustomers((prev) => [...prev, res]);
  //     toggleNewCustomer();
  //   } catch (error) {
  //     console.log("Error creating customer:", error);
  //   }
  // };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f7fafc] p-8 rounded-lg shadow-lg w-3/5">
        <div className="text-xl font-bold mb-6 text-center">Thêm khách hàng</div>
        <div className="grid grid-cols-2 gap-6">
          {/* Mã khách hàng */}
          <div className="flex flex-col">
            <label className="font-medium">Mã khách hàng</label>
            <input
              type="text"
              placeholder="Mã mặc định"
              disabled
              className="border-b-2 bg-[#f7fafc] outline-none focus:border-black mt-2 py-1"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-medium">Email</label>
            <input
              type="text"
              placeholder="qwe@gmail.com"
              value={newCustomer.email}
              onChange={(e) => handleNewCustomerChange(e, "email")}
              className="border-b-2 bg-[#f7fafc] outline-none focus:border-black mt-2 py-1"
            />
          </div>

          {/* Tên khách hàng */}
          <div className="flex flex-col">
            <label className="font-medium">Tên khách hàng</label>
            <input
              type="text"
              placeholder="Ví dụ: Nguyễn Văn A"
              value={newCustomer.name}
              onChange={(e) => handleNewCustomerChange(e, "name")}
              className="border-b-2 bg-[#f7fafc] outline-none focus:border-black mt-2 py-1"
            />
          </div>

          {/* Điện thoại */}
          <div className="flex flex-col">
            <label className="font-medium">Điện thoại</label>
            <input
              type="text"
              placeholder="Ví dụ: 0912345678"
              value={newCustomer.phoneNumber}
              onChange={(e) => handleNewCustomerChange(e, "phoneNumber")}
              className="border-b-2 bg-[#f7fafc] outline-none focus:border-black mt-2 py-1"
            />
          </div>

          {/* Ngày sinh */}
          <div className="flex flex-col">
            <label className="font-medium">Ngày sinh</label>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              value={newCustomer.dob}
              onChange={(e) => handleNewCustomerChange(e, "dob")}
              className="border-b-2 bg-[#f7fafc] outline-none focus:border-black mt-2 py-1"
            />
          </div>

          {/* Giới tính */}
          <div className="flex flex-col">
            <label className="font-medium">Giới tính</label>
            <select
              value={newCustomer.gender}
              onChange={(e) => handleGenderChange(e, "gender")}
              className="border-b-2 bg-[#f7fafc] outline-none focus:border-black mt-2 py-1"
            >
              <option value="">Chọn giới tính</option>
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
            </select>
          </div>

          {/* Địa chỉ */}
          <div className="flex flex-col col-span-2">
            <label className="font-medium">Địa chỉ</label>
            <input
              type="text"
              value={newCustomer.address}
              onChange={(e) => handleNewCustomerChange(e, "address")}
              className="border-b-2 bg-[#f7fafc] outline-none focus:border-black mt-2 py-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 items-center mt-8">
          {/* Lưu */}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            onClick={handleCreateCustomer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
            </svg>
            Lưu
          </button>

          {/* Hủy */}
          <button
            className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
            onClick={toggleNewCustomer}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

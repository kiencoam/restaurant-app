import { createSupplier, CreateSupplierRequest, SupplierEntity } from "@/app/api-client/SupplierService";
import { SupplierStatusEnum } from "@/app/constants/SupplierStatusEnum";
import { useState } from "react";
import { GetSupplierRequest } from "./page";

type Props = {
  setSuppliers: React.Dispatch<React.SetStateAction<SupplierEntity[]>>;
  toggleNewSupplier: () => void;
  pageSize: number;
  setFilter: React.Dispatch<React.SetStateAction<GetSupplierRequest>>;
}

export default function CreateSupplierForm({
  setSuppliers,
  toggleNewSupplier,
  pageSize,
  setFilter,
}: Props) {

  const [newSupplier, setNewSupplier] = useState<CreateSupplierRequest>({
    name: "",
    code: "",
    address: "",
    email: "",
    phoneNumber: "",
    // note: ""
  })

  const handleNewSupplierChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    let newValue = e.target.value;
    setNewSupplier({
      ...newSupplier,
      [field]: newValue,
    });
  }
  
  const handleCreateSupplier = async () => {
    try {
      createSupplier(newSupplier).then((res) => {
        res.status = SupplierStatusEnum.Active;
        console.log("Supplier created:", res);
        // setSuppliers((prev) => {
        //   if (prev.length === pageSize) {          
        //     return [res, ...prev.slice(0, prev.length - 1)];
        //   }   
        //   return [res, ...prev];
        // });
        setFilter(prev => ({ ...prev })); // Kích hoạt useEffect
        toggleNewSupplier();
      });
    } catch (error) {
      console.log("Error creating suppler:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] md:w-[50%] h-auto">
        <div className="text-xl font-bold mb-8">Thêm nhà cung cấp</div>
        
        {/* Form Container */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Ngăn trình duyệt reload khi submit
            handleCreateSupplier(); // Gọi hàm xử lý khi submit
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Mã nhà cung cấp */}
          <div>
            <label className="block text-sm font-medium mb-2">Mã nhà cung cấp</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Mã mặc định"
              value={newSupplier.code}
              onChange={(e) => handleNewSupplierChange(e, "code")}
              disabled
            />
          </div>
  
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              type="email"
              placeholder="qwe@gmail.com"
              value={newSupplier.email}
              onChange={(e) => handleNewSupplierChange(e, "email")}
            />
          </div>
  
          {/* Tên nhà cung cấp */}
          <div>
            <label className="block text-sm font-medium mb-2">Tên nhà cung cấp</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              value={newSupplier.name}
              onChange={(e) => handleNewSupplierChange(e, "name")}
              required
            />
          </div>
  
          {/* Điện thoại */}
          <div>
            <label className="block text-sm font-medium mb-2">Điện thoại</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Ví dụ: 0912345678"
              value={newSupplier.phoneNumber}
              onChange={(e) => handleNewSupplierChange(e, "phoneNumber")}
              pattern="[0-9]{10}"
              required
            />
          </div>
  
          {/* Địa chỉ */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Địa chỉ</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              value={newSupplier.address}
              onChange={(e) => handleNewSupplierChange(e, "address")}
            />
          </div>
  
          {/* Buttons */}
          <div className="flex justify-end mt-8 gap-4 md:col-span-2">
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-opacity-80 focus:ring-2 focus:ring-black"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={toggleNewSupplier}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );  
}

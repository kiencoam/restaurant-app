export default function CreateSupplierForm({
  setNewSupplier,
  newSupplier,
  toggleNewSupplier,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f7fafc] p-6 rounded-lg shadow-lg w-3/5 h-6/10">
        <div className="text-xl font-bold mb-12">Thêm nhà cung cấp</div>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="w-32">Mã nhà cung cấp</div>
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
                onChange={(e) =>
                  setNewSupplier({
                    ...newSupplier,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-4">
            <div className="w-32">Tên nhà cung cấp</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                type="text"
                onChange={(e) =>
                  setNewSupplier({
                    ...newSupplier,
                    name: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setNewSupplier({
                    ...newSupplier,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-4">
            <div className="w-32">Ghi chú</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2"
                type="text"
                onChange={(e) =>
                  setNewSupplier({
                    ...newSupplier,
                    note: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>Địa chỉ</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 items-center mt-12">
          <button
            className="flex pl-2 items-center border rounded-md bg-black "
            onClick={toggleNewSupplier}
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
          <button className="p-2 rounded right-0" onClick={toggleNewSupplier}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

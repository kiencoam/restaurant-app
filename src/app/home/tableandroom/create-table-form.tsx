export default function CreateTableForm({
  newTable,
  setNewTable,
  toggleNewTable,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f7fafc] p-6 rounded-lg shadow-lg w-3/5 h-6/10">
        <div className="text-xl font-bold mb-12">Thêm phòng/bàn</div>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="w-32">Mã phòng/bàn</div>
            <div className="flex items-center text-sm  bg-[#f7fafc] w-[243.5px]">
              <input
                className=" bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                type="text"
                placeholder="Mã tự động sinh"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div>Số ghế</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                type="text"
                onChange={(e) =>
                  setNewTable({
                    ...newTable,
                    capacity: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-4">
            <div className="w-32">Tên phòng/bàn</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                type="text"
                onChange={(e) =>
                  setNewTable({
                    ...newTable,
                    name: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>Khu vực</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <input
                className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                type="text"
                onChange={(e) =>
                  setNewTable({
                    ...newTable,
                    location: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-4">
            <div className="w-32">Trạng thái</div>
            <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
              <select className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2">
                <option value="true">Đang hoạt động</option>
                <option value="false">Ngừng hoạt động</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 items-center mt-12">
          <button
            className="flex pl-2 items-center border rounded-md bg-black "
            onClick={toggleNewTable}
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
          <button className="p-2 rounded right-0" onClick={toggleNewTable}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

import { sampleLocations } from "@/app/api-client/Locations";
import { createTable, CreateTableRequest, TableEntity } from "@/app/api-client/TableService";
import { useState } from "react";
import { GetTableRequest } from "./page";

const sampleTypes = ["TABLE", "ROOM"];

export default function CreateTableForm({
  setTables,
  setIsNewTable,
  setFilter
}: {
  setTables: React.Dispatch<React.SetStateAction<TableEntity[]>>;
  setIsNewTable: React.Dispatch<React.SetStateAction<boolean>>;
  setFilter: React.Dispatch<React.SetStateAction<GetTableRequest>>;
}) {
  const [newTable, setNewTable] = useState<CreateTableRequest>({
    name: "",
    capacity: 4,
    type: "TABLE",
    location: "Tầng 1",
    isActive: true,
  });

  const handleSaveCreate = async (e) => {
    /* Gọi API */
    // const table = await createTable(newTable);
    // if (ok) {
    e.preventDefault()
    try {
      createTable(newTable).then((res) => {
        console.log("Table created:", res);
        setFilter(prev => ({ ...prev })); // Kích hoạt useEffect
        setIsNewTable((prev) => !prev);
      });
    } catch (error) {
      console.log("Error creating table:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f7fafc] p-6 rounded-lg shadow-lg w-3/5 h-6/10">
        <form onSubmit={(e) => handleSaveCreate(e)}>
          <div className="text-xl font-bold mb-12">Thêm phòng/bàn</div>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="w-32">Mã phòng/bàn</div>
              <div className="flex items-center text-sm  bg-[#f7fafc] w-[243.5px]">
                <input
                  className=" bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                  type="text"
                  placeholder="Mã tự động sinh"
                  disabled
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>Số ghế</div>
              <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
                <input
                  className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                  type="number"
                  value={newTable.capacity}
                  onChange={(e) =>
                    setNewTable({
                      ...newTable,
                      capacity: Number(e.target.value),
                    })
                  }
                  min={1}
                  max={99}
                  required
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
                  value={newTable.name}
                  onChange={(e) =>
                    setNewTable({
                      ...newTable,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>Vị trí</div>
              <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
                <select
                  value={newTable.location}
                  onChange={(e) =>
                    setNewTable({
                      ...newTable,
                      location: e.target.value,
                    })
                  }
                  className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2"
                >
                  {sampleLocations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="w-32">Trạng thái</div>
              <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
                <select
                  value={newTable.isActive ? "true" : "false"}
                  onChange={(e) =>
                    setNewTable({
                      ...newTable,
                      isActive: e.target.value === "true",
                    })
                  }
                  className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2"
                >
                  <option value="true">Đang hoạt động</option>
                  <option value="false">Ngừng hoạt động</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>Loại</div>
              <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
                <select
                  value={newTable.type}
                  onChange={(e) =>
                    setNewTable({
                      ...newTable,
                      type: e.target.value,
                    })
                  }
                  className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2"
                >
                  {sampleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 items-center mt-12">
            <button
              type="submit"
              className="flex pl-2 items-center border rounded-md bg-black "
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
              onClick={() => setIsNewTable((prev) => !prev)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

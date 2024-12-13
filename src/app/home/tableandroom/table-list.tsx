import { deleteTable, TableEntity, updateTable, UpdateTableRequest } from "@/app/api-client/TableService";
import React, { useState } from "react";
import { sampleLocations } from "@/app/api-client/Locations";
import { GetTableRequest } from "./page";

const sampleTypes = ["TABLE", "ROOM"];

export default function TableList({
  tables,
  setTables,
  setFilter,
}: {
  tables: TableEntity[];
  setTables: React.Dispatch<React.SetStateAction<TableEntity[]>>;
  setFilter: React.Dispatch<React.SetStateAction<GetTableRequest>>;
}) {
  const [updatingTableId, setUpdatingTableId] = useState<number | null>(null);
  const [updatingTable, setUpdatingTable] = useState<UpdateTableRequest | null>(
    null
  );

  const handleRowClick = (id: number) => {
    if (updatingTableId === id) {
      setUpdatingTableId(null); // Collapse the row if it's already expanded
      setUpdatingTable(null);
    } else {
      setUpdatingTableId(id); // Expand the clicked row
      setUpdatingTable(tables.find((table) => table.id === id));
    }
  };

  const handleSaveUpdate = async () => {
    try {
      updateTable(updatingTableId, updatingTable).then((res) => {
        setTables((prev) =>
          prev.map((table) =>
            table.id === updatingTableId ? { ...table, ...res } : table
          )
        );
      });
    } catch (error) {
      console.error(error);
    }
    /* Gọi API */
    // await updateTable(updatingTableId, updatingTable);
    // if (ok) {
    // setTables((prev) =>
    //   prev.map((table) =>
    //     table.id === updatingTableId ? { ...table, ...updatingTable } : table
    //   )
    // );
    handleRowClick(updatingTableId);
  };

  
  const handleDelete = () => {
    /* Gọi API */
    const hasConfirmed = confirm("Bạn có chắc muốn xóa phòng/bàn này không?");
    if (!hasConfirmed) return;
    console.log(updatingTableId);
    deleteTable(updatingTableId)
      .then(() => {
        console.log("deleted")
        handleRowClick(updatingTableId);
        setFilter(prev => ({ ...prev })); // Kích hoạt useEffect    
      })
      .catch((error) => {
        alert("Có lỗi khi xóa phòng/bàn.");
        console.error(error);
      });
    // await deleteTable(updatingTableId);
    // if (ok) {
    // handleRowClick(updatingTableId);
    // setTables((prev) => prev.filter((table) => table.id !== updatingTableId));
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 mt-6">
        <thead>
          <tr className="bg-[#f7fafc] border-b-2">
            <th className="px-4 py-2 border-b text-left">Mã phòng/bàn</th>
            <th className="px-4 py-2 border-b text-left">Tên phòng/bàn</th>
            <th className="px-4 py-2 border-b text-left">Khu vực</th>
            <th className="px-4 py-2 border-b text-left">Số ghế</th>
            <th className="px-4 py-2 border-b text-left">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <React.Fragment key={table.id}>
              <tr
                key={table.id}
                className="hover:bg-gray-100 border-b-2 cursor-pointer"
                onClick={(e) => {
                  handleRowClick(table.id); // Expand or collapse row
                }}
              >
                <td className="px-4 py-2 border-b text-blue-600">
                  <button>{table.id}</button>
                </td>
                <td className="px-4 py-2 border-b">{table.name}</td>
                <td className="px-4 py-2 border-b">{table.location}</td>
                <td className="px-4 py-2 border-b">{table.capacity}</td>
                <td className="px-4 py-2 border-b">
                  {table.isActive === true
                    ? "Đang hoạt động"
                    : "Ngừng hoạt động"}
                </td>
              </tr>
              {updatingTableId === table.id && (
                <tr>
                  <td colSpan={6} className="bg-gray-50 p-4">
                    {/* Detailed information and editable fields */}
                    <form onSubmit={() => handleSaveUpdate()}>
                      <div className="space-y-4">
                        <div className="flex space-x-12">
                          <label className="w-64">
                            Mã phòng/bàn:
                            <div className="w-full border-b-2 bg-gray-50 mt-2 text-gray-500">
                              {table.id}
                            </div>
                          </label>
                          <label className="w-64">
                            Tên phòng/bàn:
                            <input
                              type="text"
                              value={updatingTable.name}
                              onChange={(e) =>
                                setUpdatingTable((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              required
                              className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                            />
                          </label>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-12">
                            <label className="w-64">
                              Vị trí
                              <select
                                className="w-full border-b-2 bg-gray-50 mt-2 outline-none"
                                value={updatingTable.location}
                                onChange={(e) =>
                                  setUpdatingTable((prev) => ({
                                    ...prev,
                                    location: e.target.value,
                                  }))
                                }
                              >
                                {sampleLocations.map((location) => (
                                  <option key={location} value={location}>
                                    {location}
                                  </option>
                                ))}
                              </select>
                            </label>
                            <label className="w-64">
                              Số ghế
                              <div className="w-full border-b-2 bg-gray-50 mt-2 text-gray-500">
                                {table.capacity}
                              </div>
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-12">
                            <label className="w-64">
                              Trạng thái
                              <select
                                className="w-full border-b-2 bg-gray-50 mt-2 outline-none"
                                value={
                                  updatingTable.isActive ? "true" : "false"
                                }
                                onChange={(e) =>
                                  setUpdatingTable((prev) => ({
                                    ...prev,
                                    isActive: e.target.value === "true",
                                  }))
                                }
                              >
                                <option value="true">Đang hoạt động</option>
                                <option value="false">Ngừng hoạt động</option>
                              </select>
                            </label>
                            <label className="w-64">
                              Loại
                              <select
                                className="w-full border-b-2 bg-gray-50 mt-2 outline-none"
                                value={updatingTable.type}
                                onChange={(e) =>
                                  setUpdatingTable((prev) => ({
                                    ...prev,
                                    type: e.target.value,
                                  }))
                                }
                              >
                                {sampleTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="border rounded-md px-2 shadow-sm bg-black text-white"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={() => handleDelete()}
                              className="border rounded-md px-2 shadow-sm bg-red-600 text-white"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                        {/* Add other editable fields as needed */}
                      </div>
                    </form>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

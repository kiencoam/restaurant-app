
import React, { useState } from "react";
import { MenuItemEntity, MenuSectionEntity } from "../order-taking/entity";
import { deleteMenuItem, updateMenuItem, UpdateMenuItemRequest } from "@/app/api-client/MenuItemService";
import Image from "next/image";

export default function MenuItemList({
  menuItems,
  setMenuItems,
  menuSections,
}: {
  menuItems: MenuItemEntity[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItemEntity[]>>;
  menuSections: MenuSectionEntity[];
}) {
  const [updatingMenuItemId, setUpdatingMenuItemId] = useState<number | null>(
    null
  );
  const [updatingMenuItem, setUpdatingMenuItem] =
    useState<UpdateMenuItemRequest | null>(null);

  const handleRowClick = (id: number) => {
    if (updatingMenuItemId === id) {
      setUpdatingMenuItemId(null); // Collapse the row if it's already expanded
      setUpdatingMenuItem(null);
    } else {
      setUpdatingMenuItemId(id); // Expand the clicked row
      setUpdatingMenuItem(menuItems.find((item) => item.id === id));
    }
  };

  const handleSaveUpdate = async () => {
    /* Gọi API */
    // await updateMenuItem(updatingMenuItemId, updatingMenuItem);
    // if (ok) {
    try {
      updateMenuItem(updatingMenuItemId, updatingMenuItem).then((res) => {
        setMenuItems((prev) =>
          prev.map((menu) =>
            menu.id === updatingMenuItemId
              ? { ...menu, ...res }
              : menu
          )
        );
      });
    } catch (error) {
      console.error(error);
    }
    handleRowClick(updatingMenuItemId);
  };

  const handleDelete = async () => {
    /* Gọi API */
    const hasConfirmed = confirm("Bạn có chắc muốn xóa món này không?");
    if (!hasConfirmed) return;

    console.log(updatingMenuItemId);
    deleteMenuItem(updatingMenuItemId)
      .then(() => {
        console.log("deleted");
        // handleRowClick(updatingMenuItemId);
        // setFilter(prev => ({ ...prev })); // Kích hoạt useEffect
        handleRowClick(updatingMenuItemId);
        setMenuItems((prev) =>
          prev.filter((table) => table.id !== updatingMenuItemId)
        );
      })
      .catch((error) => {
        alert("Có lỗi khi xóa món.");
        console.error(error);
      });
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 mt-6">
        <thead>
          <tr className="bg-[#f7fafc] border-b-2">
            <th className="px-4 py-2 border-b text-left">Mã món ăn</th>
            <th className="px-4 py-2 border-b text-left">Tên món ăn</th>
            <th className="px-4 py-2 border-b text-left">Giá vốn</th>
            <th className="px-4 py-2 border-b text-left">Giá bán</th>
            <th className="px-4 py-2 border-b text-left">Nhóm thực đơn</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              <tr
                key={item.id}
                className="hover:bg-gray-100 border-b-2 cursor-pointer"
                onClick={(e) => {
                  handleRowClick(item.id); // Expand or collapse row
                }}
              >
                <td className="px-4 py-2 border-b text-blue-600">
                  <button>{item.id}</button>
                </td>
                <td className="px-4 py-2 border-b">{item.title}</td>
                <td className="px-4 py-2 border-b">{item.costPrice}</td>
                <td className="px-4 py-2 border-b">{item.sellingPrice}</td>
                <td className="px-4 py-2 border-b">
                  {
                    menuSections.find(
                      (section) => section.id === item.menuSectionId
                    )?.title
                  }
                </td>
              </tr>
              {updatingMenuItemId === item.id && (
                <tr>
                  <td colSpan={6} className="bg-gray-50 p-4">
                    {/* Detailed information and editable fields */}
                    <div className="space-y-4">
                      <div className="flex gap-10">
                        <div className="space-y-4">
                          <div className="flex space-x-12">
                            <label className="w-64">
                              Mã món ăn
                              <div className="w-full border-b-2 bg-gray-50 mt-2 text-gray-500">
                                {item.id}
                              </div>
                            </label>
                            <label className="w-64">
                              Tên món ăn
                              <input
                                type="text"
                                value={updatingMenuItem.title}
                                onChange={(e) =>
                                  setUpdatingMenuItem((prev) => ({
                                    ...prev,
                                    title: e.target.value,
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
                                Giá vốn
                                <input
                                  type="number"
                                  value={updatingMenuItem.costPrice}
                                  onChange={(e) =>
                                    setUpdatingMenuItem((prev) => ({
                                      ...prev,
                                      costPrice: Number(e.target.value),
                                    }))
                                  }
                                  min={0}
                                  required
                                  className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                                />
                              </label>
                              <label className="w-64">
                                Nhóm thực đơn
                                <select
                                  className="w-full border-b-2 bg-gray-50 mt-2 outline-none"
                                  value={updatingMenuItem.menuSectionId}
                                  onChange={(e) =>
                                    setUpdatingMenuItem((prev) => ({
                                      ...prev,
                                      menuSectionId: Number(e.target.value),
                                    }))
                                  }
                                >
                                  {menuSections.map((section) => (
                                    <option key={section.id} value={section.id}>
                                      {section.title}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-12">
                              <label className="w-64">
                                Giá bán
                                <input
                                  type="number"
                                  value={updatingMenuItem.sellingPrice}
                                  onChange={(e) =>
                                    setUpdatingMenuItem((prev) => ({
                                      ...prev,
                                      sellingPrice: Number(e.target.value),
                                    }))
                                  }
                                  min={0}
                                  required
                                  className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                                />
                              </label>
                              <label className="w-64">
                                Mô tả
                                <input
                                  type="text"
                                  value={updatingMenuItem.description}
                                  onChange={(e) =>
                                    setUpdatingMenuItem((prev) => ({
                                      ...prev,
                                      description: e.target.value,
                                    }))
                                  }
                                  className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <label className="w-64">
                            Link ảnh
                            <input
                              type="text"
                              value={updatingMenuItem.thumbnailImg}
                              onChange={(e) =>
                                setUpdatingMenuItem((prev) => ({
                                  ...prev,
                                  thumbnailImg: e.target.value,
                                }))
                              }
                              className="w-full border-b-2 bg-gray-50 mt-2 focus:border-b-black outline-none"
                            />
                          </label>
                          <div className="flex justify-center items-center">
                            <img
                              src={updatingMenuItem.thumbnailImg}
                              alt="thumbnail"
                              className="w-28 h-28 object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveUpdate()}
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
                    </div>
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

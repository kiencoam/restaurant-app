/*
  Gọi API tạo mới phòng/bàn ở dòng 27
*/

import { useState } from "react";
import { MenuItemEntity, MenuSectionEntity } from "../order-taking/entity";
import { CreateMenuItemRequest } from "@/app/api-client/MenuItemService";
import { CreateMenuSectionRequest } from "@/app/api-client/MenuSectionService";

export default function CreateMenuSectionForm({
  setMenuSections,
  setIsNewMenuSection,
}: {
  setMenuSections: React.Dispatch<React.SetStateAction<MenuSectionEntity[]>>;
  setIsNewMenuSection: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [newMenuSection, setNewMenuSection] =
    useState<CreateMenuSectionRequest>({
      title: "",
      description: "",
    });

  const handleSaveCreate = async () => {
    /* Gọi API */
    //
    // if (ok) {
    const menuSection: MenuSectionEntity = {
      id: Math.floor(Math.random() * 1000),
      ...newMenuSection,
    };
    setMenuSections((prev) => [...prev, menuSection]);
    setIsNewMenuSection((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f7fafc] p-6 rounded-lg shadow-lg w-2/5">
        <form onSubmit={() => handleSaveCreate()}>
          <div className="text-xl font-bold mb-12">Thêm nhóm thực đơn</div>
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="w-40">Tên nhóm thực đơn</div>
              <div className="flex items-center text-sm bg-[#f7fafc] w-[243.5px]">
                <input
                  className=" bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                  type="text"
                  placeholder="Nhập tên nhóm thực đơn"
                  value={newMenuSection.title}
                  onChange={(e) =>
                    setNewMenuSection((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="w-40">Mô tả</div>
              <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
                <input
                  className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                  type="text"
                  value={newMenuSection.description}
                  onChange={(e) =>
                    setNewMenuSection((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
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
              onClick={() => setIsNewMenuSection((prev) => !prev)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

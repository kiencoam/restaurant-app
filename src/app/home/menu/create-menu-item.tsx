import { useState } from "react";
import { MenuItemEntity, MenuSectionEntity } from "../order-taking/entity";
import {
  createMenuItem,
  CreateMenuItemRequest,
} from "@/app/api-client/MenuItemService";
import CreateMenuSectionForm from "./create-menu-section";
import { ParamsRequest } from "./page";
import Image from "next/image";

export default function CreateMenuItemForm({
  setMenuItems,
  setIsNewMenuItem,
  menuSections,
  setMenuSections,
  setParamsRequest,
}: {
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItemEntity[]>>;
  setIsNewMenuItem: React.Dispatch<React.SetStateAction<boolean>>;
  menuSections: MenuSectionEntity[];
  setMenuSections: React.Dispatch<React.SetStateAction<MenuSectionEntity[]>>;
  setParamsRequest: React.Dispatch<React.SetStateAction<ParamsRequest>>;
}) {
  const [newMenuItem, setNewMenuItem] = useState<CreateMenuItemRequest>({
    title: "",
    description: "",
    costPrice: 0,
    sellingPrice: 0,
    thumbnailImg: "/menu-item/default.jpg",
    menuSectionId: undefined,
  });

  const [isNewMenuSection, setIsNewMenuSection] = useState<boolean>(false);

  const handleSaveCreate = async (e) => {
    /* Gọi API */
    // createMenuItem(newMenuItem);
    // if (ok) {
    console.log(newMenuItem);
    e.preventDefault();
    try {
      createMenuItem(newMenuItem).then((res) => {
        console.log("menuitem created:", res);
        setParamsRequest((prev) => ({ ...prev })); // Kích hoạt useEffect
        setIsNewMenuItem((prev) => !prev);
      });
    } catch (error) {
      console.log("Error creating menuitem:", error);
    }
    // const menuItem: MenuItemEntity = {
    //   id: Math.floor(Math.random() * 1000),
    //   ...newMenuItem,
    // };
    // setMenuItems((prev) => [...prev, menuItem]);
    // setIsNewMenuItem((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#f7fafc] p-6 rounded-lg shadow-lg w-3/5 h-6/10">
        <form onSubmit={(e) => handleSaveCreate(e)}>
          <div className="text-xl font-bold mb-12">Thêm món ăn</div>
          <div className="flex justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-32">Mã món ăn</div>
                <div className="flex items-center text-sm bg-[#f7fafc] w-[243.5px]">
                  <input
                    className=" bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                    type="text"
                    placeholder="Mã tự động sinh"
                    disabled
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-32">Tên món</div>
                <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
                  <input
                    className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                    type="text"
                    value={newMenuItem.title}
                    onChange={(e) =>
                      setNewMenuItem((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-32">Giá vốn</div>
                <div className="flex items-center text-sm bg-[#f7fafc] w-[243.5px]">
                  <input
                    className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                    type="number"
                    // value={newMenuItem.costPrice}
                    onChange={(e) =>
                      setNewMenuItem((prev) => ({
                        ...prev,
                        costPrice: Number(e.target.value),
                      }))
                    }
                    min={0}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-32">Giá bán</div>
                <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
                  <input
                    className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                    type="number"
                    //value={newMenuItem.sellingPrice}
                    onChange={(e) =>
                      setNewMenuItem((prev) => ({
                        ...prev,
                        sellingPrice: Number(e.target.value),
                      }))
                    }
                    min={0}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-32">Nhóm thực đơn</div>
                <div className="flex items-center text-sm  bg-[#f7fafc]  w-[210px]">
                  <select
                    value={newMenuItem.menuSectionId}
                    onChange={(e) =>
                      setNewMenuItem((prev) => ({
                        ...prev,
                        menuSectionId: e.target.value
                          ? Number(e.target.value)
                          : undefined, // Chuyển về undefined nếu không chọn nhóm
                      }))
                    }
                    className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2"
                    required
                  >
                    {/* Thêm option mặc định */}
                    <option value={""}>Chọn nhóm</option>

                    {menuSections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.title}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  title="Thêm nhóm thực đơn mới"
                  onClick={() => setIsNewMenuSection((prev) => !prev)}
                  className="font-extrabold text-xl"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-32">Mô tả</div>
                <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
                  <input
                    className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                    type="text"
                    value={newMenuItem.description}
                    onChange={(e) =>
                      setNewMenuItem((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div>Link ảnh </div>
                <div className="flex items-center text-sm  bg-[#f7fafc]  w-[243.5px]">
                  <input
                    className="bg-[#f7fafc] w-full outline-none focus:border-b-black border-b-2 "
                    type="text"
                    value={newMenuItem.thumbnailImg}
                    onChange={(e) =>
                      setNewMenuItem((prev) => ({
                        ...prev,
                        thumbnailImg: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
              <div className="relative overflow-hidden h-28 w-28">
                <Image
                  src={newMenuItem.thumbnailImg}
                  alt="thumbnail"
                  layout="fill"
                  className="absolute w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 items-center mt-12 mb-4">
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
              type="button"
              className="p-2 rounded right-0"
              onClick={() => setIsNewMenuItem((prev) => !prev)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
      {isNewMenuSection && (
        <CreateMenuSectionForm
          setMenuSections={setMenuSections}
          setIsNewMenuSection={setIsNewMenuSection}
        />
      )}
    </div>
  );
}

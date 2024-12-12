/*
  Gọi API lấy tất cả menu items ở dòng 113 done
  Gọi API lấy tất cả menu sections ở dòng 127 done
*/

"use client";
import React, { useEffect, useRef, useState } from "react";
import { MenuItemEntity, MenuSectionEntity } from "../order-taking/entity";
import { PageInfo } from "@/app/api-client/PageInfo";
import MenuItemList from "./menu-item-list";
import CreateMenuItemForm from "./create-menu-item";
import { getAllMenuItems } from "@/app/api-client/MenuItemService";
import { getAllMenuSections } from "@/app/api-client/MenuSectionService";

export type ParamsRequest = {
  page: number;
  page_size: number;
  title?: string;
  menu_section_id?: number;
};

const sampleMenuItems: MenuItemEntity[] = [
  {
    id: 1,
    title: "Bánh mì",
    costPrice: 15000,
    sellingPrice: 5000,
    thumbnailImg: "https://via.placeholder.com/150",
    description: "Bánh mì thịt nguội",
    menuSectionId: 1,
  },
  {
    id: 2,
    title: "Cà phê sữa",
    costPrice: 20000,
    sellingPrice: 5000,
    thumbnailImg: "https://via.placeholder.com/150",
    description: "Cà phê sữa đá",
    menuSectionId: 2,
  },
  {
    id: 3,
    title: "Bún đậu mắm tôm",
    costPrice: 30000,
    sellingPrice: 5000,
    thumbnailImg: "https://via.placeholder.com/150",
    description: "Bún đậu mắm tôm",
    menuSectionId: 3,
  },
  {
    id: 4,
    title: "Bún riêu",
    costPrice: 25000,
    sellingPrice: 5000,
    thumbnailImg: "https://via.placeholder.com/150",
    description: "Bún riêu cua",
    menuSectionId: 3,
  },
  {
    id: 5,
    title: "Bún riêu",
    costPrice: 25000,
    sellingPrice: 5000,
    thumbnailImg: "https://via.placeholder.com/150",
    description: "Bún riêu cua",
    menuSectionId: 3,
  },
];

const sampleMenuSections: MenuSectionEntity[] = [
  {
    id: 1,
    title: "Món chính",
    description: "Món chính",
    menuItems: sampleMenuItems.filter((item) => item.menuSectionId === 1),
  },
  {
    id: 2,
    title: "Đồ uống",
    description: "Đồ uống",
    menuItems: sampleMenuItems.filter((item) => item.menuSectionId === 2),
  },
  {
    id: 3,
    title: "Món ăn vặt",
    description: "Món ăn vặt",
    menuItems: sampleMenuItems.filter((item) => item.menuSectionId === 3),
  },
];

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItemEntity[]>([]);
  const [menuSections, setMenuSections] = useState<MenuSectionEntity[]>([]);
  const filterRef = useRef(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isNewMenuItem, setIsNewMenuItem] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalPage: null,
    totalRecord: null,
    pageSize: null,
    nextPage: null,
    previousPage: null,
  });

  const [paramsRequest, setParamsRequest] = useState<ParamsRequest>({
    page: 0,
    page_size: 5,
    title: "",
    menu_section_id: null,
  });

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= pageInfo.totalPage) {
      setCurrentPage(newPage);
      handlePageNumberChange(newPage - 1);
    }
  };

  //Handle rowsPerPage change
  const changeRowsPerPage = (pageSize) => {
    setRowsPerPage(pageSize);
    handlePageSizeChange(pageSize);
  };

  const handlePageSizeChange = (value: number) => {
    setParamsRequest({
      ...paramsRequest,
      page_size: value,
      page: 0
    })
  }

  const handlePageNumberChange = (value: number) => {
    setParamsRequest({
      ...paramsRequest,
      page: value
    })
  }

  useEffect(() => {
    /* Gọi API */
    // Tạo query string từ paramsRequest
    const query = Object.entries(paramsRequest)
      .filter(([key, value]) => value !== null && value !== "")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    console.log(query);
    getAllMenuItems(query).then((data) => {
      setPageInfo(data.first);
      setMenuItems(data.second);
      //testapi
      console.log(data.second)
    });
    // setMenuItems(sampleMenuItems);
  }, [paramsRequest]);

  useEffect(() => {
    /* Gọi API lấy tất cả nhóm thực đơn */
    // getAllMenuSections()
    getAllMenuSections().then((data) => {
      setMenuSections(data)
      //testapi
      console.log(data)
    })
    //setMenuSections(sampleMenuSections);
  }, []);

  const handleSearchKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setParamsRequest((prev) => ({ ...prev, title: searchText }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full min-h-screen h-full font-nunito bg-[#f7f7f7]">
      <div className="flex p-6 justify-between items-center">
        <div className="text-2xl font-extrabold">Thực đơn</div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1011 17a6 6 0 006-6z"
              />
            </svg>
            <input
              className="p-2 bg-transparent outline-none"
              type="text"
              placeholder="Theo tên món ăn"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearchKeydown}
            />
          </div>

          <div ref={filterRef} className="relative">
            <button
              className="flex items-center border rounded-md px-2 shadow-sm"
              onClick={() => setIsFilterOpen((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              <div className="p-2 text-sm font-semibold">Filter</div>
            </button>

            {isFilterOpen && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg divide-y-2">
                <div className="p-2">
                  <p className="font-bold m-2 px-2">Nhóm thực đơn</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="radio"
                      className="form-radio"
                      name="status"
                      checked={paramsRequest.menu_section_id === null}
                      onChange={() => {
                        setParamsRequest((prev) => ({
                          ...prev,
                          menu_section_id: null,
                          page: 0,
                        }));
                        setCurrentPage(1);
                      }
                      }
                    />
                    <span>Tất cả</span>
                  </label>
                  {menuSections && menuSections.map((section) => (
                    <label
                      key={section.id}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <input
                        type="radio"
                        className="form-radio"
                        name="status"
                        checked={paramsRequest.menu_section_id === section.id}
                        onChange={() =>
                          setParamsRequest((prev) => ({
                            ...prev,
                            menu_section_id: section.id,
                            page: 0
                          }))
                        }
                      />
                      <span>{section.title}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            className="flex items-center border rounded-md px-2 shadow-sm bg-black"
            onClick={() => setIsNewMenuItem((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="white"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="p-2 text-sm font-bold text-white">Thêm món</div>
          </button>
          {isNewMenuItem && (
            <CreateMenuItemForm
              setMenuItems={setMenuItems}
              setIsNewMenuItem={setIsNewMenuItem}
              menuSections={menuSections}
              setMenuSections={setMenuSections}
              setParamsRequest={setParamsRequest}
            />
          )}
        </div>
      </div>
      <div className="px-6">
        <MenuItemList
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          menuSections={menuSections}
        />
        <div className="flex items-center space-x-8 mt-4">
          <div className="flex">
            <div>Số bản ghi: </div>
            <select
              className="bg-[#f7f7f7] outline-none"
              value={rowsPerPage}
              onChange={(e) => {
                changeRowsPerPage(Number(e.target.value));
                setCurrentPage(1);

              }}
            >
              {/* <option defaultValue={rowsPerPage}>{rowsPerPage}</option> */}
              {/* <option value={1}>1</option> */}
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                changePage(currentPage - 1); // Cập nhật số trang
                setParamsRequest(prevParams => ({
                  ...prevParams, // Giữ lại các tham số cũ
                  page: currentPage - 2, // Cập nhật page theo currentPage - 1
                }));
              }}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </button>
            {menuItems.length > 0 &&
              <span>
                Page {Math.min(currentPage, pageInfo.totalPage)} of {pageInfo.totalPage}
              </span>
            }
            <button
              onClick={() => {
                changePage(currentPage + 1); // Cập nhật số trang
                setParamsRequest(prevParams => ({
                  ...prevParams, // Giữ lại các tham số cũ
                  page: currentPage, // Cập nhật page theo currentPage + 1
                }));
              }}
              disabled={currentPage === pageInfo.totalPage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

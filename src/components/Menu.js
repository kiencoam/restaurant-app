"use client";

import { useState } from "react";

const menu = [
  {
    id: 1,
    title: "Nem chua",
    selling_price: 26000,
    menu_section_id: 1,
    image_url:
      "https://truongfoods.vn/wp-content/uploads/2024/01/snapedit_1724054760134.png",
  },
  {
    id: 2,
    title: "Bánh tráng",
    selling_price: 23000,
    menu_section_id: 1,
    image_url:
      "https://tiemkemsuti.com/wp-content/uploads/2024/03/banh-trang-tron.png",
  },
  {
    id: 3,
    title: "Bia hơi",
    selling_price: 16000,
    menu_section_id: 2,
    image_url:
      "https://thegioibiaruou.com/wp-content/uploads/2018/10/ha-noi-beer-png.png",
  },
  {
    id: 4,
    title: "Kem",
    selling_price: 20000,
    menu_section_id: 3,
    image_url:
      "https://jollibee.com.vn/media/catalog/product/cache/11f3e6435b23ab624dc55c2d3fe9479d/m/_/m_n_tr_ng_mi_ng_-_6.png",
  },
];

const menu_section = [
  {
    id: 1,
    title: "Đồ nhắm",
  },
  {
    id: 2,
    title: "Đồ uống",
  },
  {
    id: 3,
    title: "Đồ ăn vặt",
  },
];

export function Menu() {
  const [selectedMenuSectionId, setSelectedMenuSectionId] = useState(null);

  return (
    <section className="py-2">
      <div className="flex flex-col gap-y-2 py-2 h-full w-full">
        <div className="flex flex-wrap items-center font-bold max-w-full text-sm box-border">
          <button
            onClick={() => setSelectedMenuSectionId(null)}
            className={`h-9 p-2 text-center transition-all duration-500 ${
              selectedMenuSectionId === null
                ? "text-[#181818] border-b border-[#181818]"
                : "text-[#777777]"
            }`}
          >
            Tất cả
          </button>
          {menu_section.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedMenuSectionId(section.id)}
              className={`h-9 p-2 text-center transition-all duration-500 ${
                selectedMenuSectionId === section.id
                  ? "text-[#181818] border-b border-[#181818]"
                  : "text-[#777777]"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        <div className="p-2 flex flex-wrap gap-2 max-h-[500px] overflow-auto">
          {menu
            .filter((item) =>
              selectedMenuSectionId === null
                ? true
                : item.menu_section_id === selectedMenuSectionId
            )
            .map((item) => (
              <div
                key={item.id}
                className="bg-[#f5f5f5] h-44 w-28 p-2 text-sm flex flex-col justify-between rounded-md shadow-sm active:shadow-[#d7d7d7] active:shadow-inner"
              >
                <div>
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="object-contain h-24 w-24"
                  />
                </div>
                <h1 className="text-center font-semibold text-[#7d7d7d]">
                  ₫{item.selling_price}
                </h1>
                <h1 className="text-center font-bold text-[#181818]">
                  {item.title}
                </h1>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

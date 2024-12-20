"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MenuItemEntity,
  MenuSectionEntity,
} from "@/app/home/order-taking/entity";

export function Menu({
  handleAddMenuItem,
  menuSections,
}: {
  handleAddMenuItem: (itemId: number) => void;
  menuSections: MenuSectionEntity[];
}) {
  const [selectedMenuSectionId, setSelectedMenuSectionId] = useState(null);

  const menuItems = menuSections?.flatMap((section) => section.menuItems);

  const viewMenuItems = menuItems.filter((item) =>
    selectedMenuSectionId === null
      ? true
      : item.menuSectionId === selectedMenuSectionId
  );

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
          {menuSections.map((section) => (
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
          {viewMenuItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#f5f5f5] h-44 w-28 p-2 text-sm flex flex-col justify-between rounded-md shadow-sm active:shadow-[#d7d7d7] active:shadow-inner"
              onClick={() => handleAddMenuItem(item.id)}
            >
              <div className="relative overflow-hidden w-24 h-24">
                <Image
                  src={item.thumbnailImg}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="absolute object-cover w-full h-full"
                />
              </div>
              <h1 className="text-center font-semibold text-[#7d7d7d]">
                ₫{item.sellingPrice.toLocaleString("en-US")}
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

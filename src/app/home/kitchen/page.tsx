// 'use client'

import { createMenuItem, getAllMenuItems, getDetailMenuItem, updateMenuItem } from "@/app/api-client/MenuItemService";
import { getDetailProduct } from "@/app/api-client/ProductService";
import { getStatisticByRevenueAndDate } from "@/app/api-client/StatisticService";
import { Ordered } from "@/components/Ordered";
import { Prepared } from "@/components/Prepared";
import { useEffect } from "react";

const KitchenPage = async () => {
  // const result = await getAllMenuItems("menu_section_id=1")
  // console.log(result);

  // const result = await getDetailMenuItem(5);
  // console.log(result);

  // const result = await createMenuItem({
  //   title: "Bún chả 3",
  //   description: "Bún chả Hà Nội 3",
  //   costPrice: 20000,
  //   sellingPrice: 30000,
  //   menuSectionId: 1
  // })
  // console.log(result);

  // const result = await updateMenuItem(8, {
  //   title: "Bún chả 5",
  //   description: "Bún chả Hà Nội 3",
  //   costPrice: 20000,
  //   sellingPrice: 30000,
  //   menuSectionId: 1
  // })
  // console.log(result);

  // const product = await getDetailProduct(1);
  // console.log(product);

  return (
    <section className="flex h-screen w-full bg-[#f7f7f7]">
      <Ordered />
      <Prepared />
    </section>
  );
};

export default KitchenPage;

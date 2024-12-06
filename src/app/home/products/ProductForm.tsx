"use client";


import { getDetailMenuItem } from "@/app/api-client/MenuItemService";
import { createProduct, CreateProductRequest, ProductEntity } from "@/app/api-client/ProductService";
import { useState } from "react";

export default function ProductForm({toggleAddingNewOpen}) {

    const [product, setProduct] = useState<CreateProductRequest>({
        name: "",
        description: "",
        code: "",
        costPrice: null,
        sellingPrice: null,
        thumbnailImg: "",
        status: "",
        productType: "",
        images: [],
    });

    const handleSaveProduct = async () => {

        createProduct(product).then((res: ProductEntity) => {
            console.log(res);

        })

        toggleAddingNewOpen();
    }

    console.log(product);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, key: string) => {
        setProduct({ ...product, [key]: e.target.value });
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 h-6/10">
                <div className="text-xl font-bold mb-4">Thêm hàng hóa</div>
                <div className="flex pt-3">
                    <div className="flex items-center gap-3">
                        <div className="px-2 py-4 w-28">Mã hàng hóa</div>
                        <input
                            className="border-b-2 focus:border-b-black w-64 h-fit outline-none"
                            placeholder="Mã tự động sinh"
                            value={product?.code}
                            onChange={(e) => handleInputChange(e, "code")}
                        ></input>
                    </div>
                    <div className="flex items-center gap-3 pl-3">
                        <div className="px-2 py-4">Giá vốn</div>
                        <input
                            className="border-b-2 focus:border-b-black outline-none w-40 h-fit"
                            value={product?.costPrice}
                            onChange={(e) => handleInputChange(e, "costPrice")}
                        ></input>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex items-center gap-3">
                        <div className="px-2 py-4 w-28">Tên hàng</div>
                        <input
                            className="border-b-2 focus:border-b-black outline-none w-64 h-fit"
                            value={product?.name}
                            onChange={(e) => handleInputChange(e, "name")}
                        ></input>
                    </div>
                    <div className="flex items-center gap-3 pl-3">
                        <div className="px-2 py-4">Giá bán</div>
                        <input className="border-b-2 focus:border-b-black outline-none w-40 h-fit"
                            value={product?.sellingPrice}
                            onChange={(e) => handleInputChange(e, "sellingPrice")}
                        ></input>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-2 py-4 w-28">Loại hàng</div>
                    <select
                        className="w-64 h-fit border-b-2 focus:border-b-black outline-none"
                        value={product?.productType}
                        onChange={(e) => handleInputChange(e, "productType")}
                    >
                        <option value="">Chọn loại hàng</option>
                        <option value="FOOD">Đồ ăn</option>
                        <option value="DRINK">Đồ uống</option>
                    </select>
                </div>
                <div className="flex justify-end gap-3 items-center mt-4">
                    <button
                        className="flex pl-2 items-center border rounded-md bg-black "
                        onClick={handleSaveProduct}
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
                        onClick={toggleAddingNewOpen}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>

    );
}

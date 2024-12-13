"use client";

import { createProduct, CreateProductRequest, ProductEntity } from "@/app/api-client/ProductService";
import { useState } from "react";

type Props = {
    toggleAddingNewOpen: () => void;
    setProducts: React.Dispatch<React.SetStateAction<ProductEntity[]>>;
}

export default function ProductForm({ toggleAddingNewOpen, setProducts }: Props) {
    const [product, setProduct] = useState<CreateProductRequest>({
        name: "",
        description: "",
        code: "",
        costPrice: null,
        sellingPrice: null,
        thumbnailImg: "",
        status: "",
        productType: "INGREDIENT",
        images: [],
    });

    const handleSaveProduct = async () => {

        createProduct(product).then((res: ProductEntity) => {
            console.log(res);
            setProducts((prev) => [res, ...prev]);
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
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Ngăn form gửi yêu cầu mặc định
                        handleSaveProduct(); // Gọi hàm lưu dữ liệu
                    }}
                >
                    <div className="flex pt-3">
                        <div className="flex items-center gap-3">
                            <label htmlFor="code" className="px-2 py-4 w-28">Mã hàng hóa</label>
                            <input
                                id="code"
                                name="code"
                                className="border-b-2 focus:border-b-black w-64 h-fit outline-none"
                                placeholder="Mã tự động sinh"
                                value={product?.code}
                                onChange={(e) => handleInputChange(e, "code")}
                                disabled
                            />
                        </div>
                        <div className="flex items-center gap-3 pl-3">
                            <label htmlFor="costPrice" className="px-2 py-4">Giá vốn</label>
                            <input
                                id="costPrice"
                                name="costPrice"
                                type="number"
                                className="border-b-2 focus:border-b-black outline-none w-40 h-fit"
                                value={product?.costPrice}
                                onChange={(e) => handleInputChange(e, "costPrice")}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex items-center gap-3">
                            <label htmlFor="name" className="px-2 py-4 w-28">Tên hàng</label>
                            <input
                                id="name"
                                name="name"
                                className="border-b-2 focus:border-b-black outline-none w-64 h-fit"
                                value={product?.name}
                                onChange={(e) => handleInputChange(e, "name")}
                                required // Bắt buộc phải nhập
                            />
                        </div>
                        <div className="flex items-center gap-3 pl-3">
                            <label htmlFor="sellingPrice" className="px-2 py-4">Giá bán</label>
                            <input
                                id="sellingPrice"
                                name="sellingPrice"
                                type="number"
                                className="border-b-2 focus:border-b-black outline-none w-40 h-fit"
                                value={product?.sellingPrice}
                                onChange={(e) => handleInputChange(e, "sellingPrice")}
                                required // Bắt buộc phải nhập
                                min="0" // Chỉ cho phép giá trị >= 0
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <label htmlFor="productType" className="font-bold mb-2">Loại hàng hóa</label>
                        <select
                            id="productType"
                            className="border-b-2 focus:border-black outline-none w-64 h-fit"
                            value={product?.productType}
                            onChange={(e) => handleInputChange(e, "productType")}
                        >
                            <option value="INGREDIENT">Nguyên liệu thô</option>
                            <option value="READY_TO_EAT">Chế biến sẵn</option>
                            <option value="PROCESSED_FOOD">Món ăn chế biến</option>
                            <option value="DRINK">Đồ uống</option>
                            <option value="UTENSILS">Dụng cụ</option>
                            <option value="OTHER">Khác</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 items-center mt-4">
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
                            <div className="p-2 text-white rounded right-0">Lưu</div>
                        </button>
                        <button
                            type="button"
                            className="p-2 rounded right-0"
                            onClick={toggleAddingNewOpen}
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

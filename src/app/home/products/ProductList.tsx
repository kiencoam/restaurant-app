import React from "react";

export default function ProductList({ masterChecked,
    handleMasterCheckboxChange,
    products,
    checkedRows,
    handleRowClick,
    handleRowCheckboxChange,
    handleEditInputChange,
    editingRow,
    expandedRow,
    handleUpdateProduct
}) {
    return (
        <div className="px-6">
            <table className="min-w-full shadow-lg rounded-md border">
                <thead className="bg-[#f7fafc]">
                    <tr className="border-b-2">
                        <th className="px-4 py-2 text-start">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={masterChecked}
                                onChange={handleMasterCheckboxChange}
                            />
                        </th>
                        <th className="px-4 py-2 left-0 text-start">Mã hàng hóa</th>
                        <th className="text-start px-4 py-2">Tên hàng</th>
                        <th className="text-start px-4 py-2">Loại hàng</th>
                        <th className="text-start px-4 py-2">Giá bán</th>
                        <th className="text-start px-4 py-2">Giá vốn</th>
                        <th className="text-start px-4 py-2">Tồn kho</th>
                        <th className="text-start px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {products.map((product) => (
                        <React.Fragment key={product.id}>
                            <tr
                                key={product.id}
                                className={` border-b-2 cursor-pointer ${checkedRows[product.id] ? "bg-gray-100" : ""
                                    }`}
                                onClick={(e) => {
                                    // Ignore click on checkboxes and action buttons
                                    // if (
                                    //   e.target.type === "checkbox" ||
                                    //   e.target.tagName.toLowerCase() === "button" ||
                                    //   e.target.closest("button")
                                    // ) {
                                    //   return;
                                    // }
                                    handleRowClick(product.id); // Expand or collapse row
                                }}
                            >
                                <td className="px-4 py-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox"
                                        checked={checkedRows[product.id] || false}
                                        onChange={() => handleRowCheckboxChange(product.id)}
                                    />
                                </td>
                                <td className="px-4 py-2">{product.code}</td>
                                <td className="px-4 py-2">
                                    {editingRow === product.id ? (
                                        <input
                                            type="text"
                                            value={product.name}
                                            onChange={(e) =>
                                                handleEditInputChange(e, "name", product.id)
                                            }
                                            className="w-full"
                                        />
                                    ) : (
                                        product.name
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editingRow === product.id ? (
                                        <input
                                            type="text"
                                            value={product.productType}
                                            onChange={(e) =>
                                                handleEditInputChange(e, "productType", product.id)
                                            }
                                            className="w-full"
                                        />
                                    ) : (
                                        product.productType
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editingRow === product.id ? (
                                        <input
                                            type="text"
                                            value={product.sellingPrice}
                                            onChange={(e) =>
                                                handleEditInputChange(e, "sellingPrice", product.id)
                                            }
                                            className="w-full"
                                        />
                                    ) : (
                                        product.sellingPrice
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {editingRow === product.id ? (
                                        <input
                                            type="text"
                                            value={product.costPrice}
                                            onChange={(e) =>
                                                handleEditInputChange(e, "costPrice", product.id)
                                            }
                                            className="w-full"
                                        />
                                    ) : (
                                        product.costPrice
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {product.stock.availableQuantity}
                                </td>
                                <td></td>
                            </tr>
                            {/* Detail row */}
                            {expandedRow === product.id && (
                                <tr>
                                    <td colSpan={8} className="bg-gray-50 p-4">
                                        {/* Detailed information and editable fields */}
                                        <div className="space-y-2">
                                            <div className="flex space-x-4">
                                                <label
                                                    htmlFor={`edit-name-${product.id}`}
                                                    className="w-64"
                                                >
                                                    Tên hàng:
                                                    <input
                                                        id={`edit-name-${product.id}`}
                                                        type="text"
                                                        value={product.name}
                                                        onChange={(e) =>
                                                            handleEditInputChange(e, "name", product.id)
                                                        }
                                                        className="w-full border-b-2 focus:border-b-black outline-none bg-[#f7f9fa] p-1 "
                                                    />
                                                </label>
                                                <label
                                                    htmlFor={`edit-type-${product.id}`}
                                                    className="w-64"
                                                >
                                                    Loại hàng:
                                                    <input
                                                        id={`edit-type-${product.id}`}
                                                        type="text"
                                                        value={product.productType}
                                                        onChange={(e) =>
                                                            handleEditInputChange(e, "productType", product.id)
                                                        }
                                                        className="w-full border-b-2 focus:border-b-black outline-none bg-[#f7f9fa] p-1 "
                                                    />
                                                </label>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex space-x-4">
                                                    <label
                                                        htmlFor={`edit-price-${product.sellingPrice}`}
                                                        className="w-64"
                                                    >
                                                        Giá bán
                                                        <input
                                                            id={`edit-name-${product.sellingPrice}`}
                                                            type="text"
                                                            value={product.sellingPrice}
                                                            onChange={(e) =>
                                                                handleEditInputChange(e, "sellingPrice", product.id)
                                                            }
                                                            className="w-full border-b-2 focus:border-b-black outline-none bg-[#f7f9fa] p-1"
                                                        />
                                                    </label>
                                                    <label
                                                        htmlFor={`edit-cost-${product.id}`}
                                                        className="w-64"
                                                    >
                                                        Giá vốn
                                                        <input
                                                            id={`edit-cost-${product.id}`}
                                                            type="text"
                                                            value={product.costPrice}
                                                            onChange={(e) =>
                                                                handleEditInputChange(e, "costPrice", product.id)
                                                            }
                                                            className="w-full border-b-2 focus:border-b-black outline-none bg-[#f7f9fa] p-1 "
                                                        />
                                                    </label>
                                                    <label
                                                        htmlFor={`edit-stock-${product.id}`}
                                                        className="w-64"
                                                    >
                                                        Tồn kho
                                                        <input
                                                            id={`edit-stock-${product.id}`}
                                                            type="text"
                                                            value={product.stock.availableQuantity}
                                                            onChange={(e) =>
                                                                () => (console.log("edit stock"))
                                                            }
                                                            className="w-full border-b-2 focus:border-b-black outline-none bg-[#f7f9fa] p-1 "
                                                        />
                                                    </label>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleUpdateProduct(product.id)}
                                                        className="border rounded-md px-2 shadow-sm bg-black text-white"
                                                    >
                                                        Lưu
                                                    </button>
                                                    <button
                                                        onClick={() => handleRowClick(product.id)}
                                                        className="border rounded-md px-2 shadow-sm"
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-64">
                                                <label
                                                    htmlFor={`edit-stock-${product.id}`}
                                                    className="w-64"
                                                >
                                                    Tình trạng
                                                    <select
                                                        id={`edit-stock-${product.id}`}
                                                        value={product.status}
                                                        onChange={(e) =>
                                                            handleEditInputChange(e, "status", product.id)
                                                        }
                                                        className="w-full border-b-2 focus:border-b-black outline-none bg-[#f7f9fa] p-1"
                                                    >
                                                        <option value="ACTIVE">
                                                            {" "}
                                                            Đang kinh doanh
                                                        </option>
                                                        <option value="INACTIVE">
                                                            Ngừng kinh doanh
                                                        </option>
                                                    </select>
                                                </label>
                                            </div>
                                            {/* Add other editable fields as needed */}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

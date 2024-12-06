
import React, { useState } from "react";

export default function ProductList({
  masterChecked,
  handleMasterCheckboxChange,
  products,
  checkedRows,
  handleRowClick,
  handleRowCheckboxChange,
  handleEditInputChange,
  editingRow,
  expandedRow,
  handleUpdateProduct,
}) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / rowsPerPage);

  // Get current page rows
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRowsProducts = products.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Handle page change
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  //Handle rowsPerPage change
  const changeRowsPerPage = (rows) => {
    setRowsPerPage(rows);
  };

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
          {currentRowsProducts.map((product) => (
            <React.Fragment key={product.id}>
              <tr
                key={product.id}
                className={`hover:bg-gray-100 border-b-2 cursor-pointer ${
                  checkedRows[product.id] ? "bg-gray-100" : ""
                }`}
                onClick={(e) => {
                  const target = e.target as HTMLElement; // Cast to HTMLElement
                  // Ignore click on checkboxes and action buttons
                  if (
                    (target instanceof HTMLInputElement &&
                      target.type === "checkbox") ||
                    target.tagName.toLowerCase() === "button" ||
                    target.closest("button")
                  ) {
                    return;
                  }
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
                <td className="px-4 py-2">{product.stock.availableQuantity}</td>
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
                              handleEditInputChange(
                                e,
                                "productType",
                                product.id
                              )
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
                                handleEditInputChange(
                                  e,
                                  "sellingPrice",
                                  product.id
                                )
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
                                handleEditInputChange(
                                  e,
                                  "costPrice",
                                  product.id
                                )
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
                              onChange={(e) => () => console.log("edit stock")}
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
                            <option value="ACTIVE"> Đang kinh doanh</option>
                            <option value="INACTIVE">Ngừng kinh doanh</option>
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
      <div className="flex items-center space-x-8 mt-4">
        <div className="flex">
          <div>Số bản ghi: </div>
          <select
            className="bg-[#f7f7f7] outline-none"
            value={rowsPerPage}
            onChange={(e) => changeRowsPerPage(Number(e.target.value))}
          >
            <option defaultValue={rowsPerPage}>{rowsPerPage}</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => changePage(currentPage - 1)}
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
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
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
  );
}

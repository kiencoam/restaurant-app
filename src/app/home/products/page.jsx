"use client";
import React, { useState, useEffect, useRef } from "react";

const ProductsPage = () => {
  const [data, setData] = useState([
    {
      id: 1,
      image:
        "https://cleverads.vn/blog/wp-content/uploads/2023/10/thi-truong-healthy-food-1.jpg",
      code: "SP000001",
      name: "Thuốc lá Kent HD",
      type: "Khác",
      price: 30000,
      cost: 20500,
      stock: 1000,
      state: "sale",
    },
    {
      id: 2,
      image: "",
      code: "SP000002",
      name: "Thuốc lá Marlboro",
      type: "Khác",
      price: 35000,
      cost: 22500,
      stock: 1500,
      state: "stop",
    },
    // Add more data rows as needed
  ]);

  const [flyOutActions, setFlyOutActions] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [maxRows, setMaxRows] = useState(5); // Default to showing 5 rows
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRow, setEditingRow] = useState(null); // Track the currently editing row
  const [checkedRows, setCheckedRows] = useState({});
  const [masterChecked, setMasterChecked] = useState(false);
  const [filterType, setFilterType] = useState(""); // State to manage filter for 'Loại thực đơn'
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddingNewOpen, setIsAddingNewOpen] = useState(false);

  const filterRef = useRef(null);

  const toggleFilterDropdown = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleAddingNewOpen = () => {
    setIsAddingNewOpen(!isAddingNewOpen);
  };

  const handleRowClick = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null); // Collapse the row if it's already expanded
    } else {
      setExpandedRow(id); // Expand the clicked row
    }
  };
  const handleCreateNew = () => {
    setIsCreating(true);
    setNewRow({
      id: data.length + 1,
      code: "",
      name: "",
      type: "",
      price: "",
      cost: "",
      stock: "",
    });
  };

  const handleEditInputChange = (e, field, rowId) => {
    const updatedData = data.map((item) =>
      item.id === rowId ? { ...item, [field]: e.target.value } : item
    );
    setData(updatedData);
  };

  const handleMasterCheckboxChange = () => {
    const newMasterChecked = !masterChecked;
    setMasterChecked(newMasterChecked);
    const newCheckedRows = {};
    data.forEach((row) => {
      newCheckedRows[row.id] = newMasterChecked;
    });
    setCheckedRows(newCheckedRows);
  };

  const handleRowCheckboxChange = (id) => {
    const newCheckedRows = { ...checkedRows, [id]: !checkedRows[id] };
    setCheckedRows(newCheckedRows);
    const allChecked = data.every((row) => newCheckedRows[row.id]);
    setMasterChecked(allChecked);
  };

  const isAnyRowChecked = Object.values(checkedRows).some(Boolean);

  const handleActionSelection = (action) => {
    setSelectedAction(action);
    if (action === "Xóa hàng hóa") {
      handleDeleteSelectedItems();
    }
  };

  const handleDeleteSelectedItems = () => {
    const newRows = data.filter((row) => !checkedRows[row.id]);
    setData(newRows);
    setCheckedRows({});
    setMasterChecked(false);
    setShowActionMenu(false);
  };

  const startIndex = (currentPage - 1) * maxRows;
  const displayedData = data
    .filter((row) => filterType === "" || row.type === filterType) // Apply filter here
    .slice(startIndex, startIndex + maxRows);
  const totalPages = Math.ceil(data.length / maxRows);

  return (
    <div className="w-full h-screen font-nunito bg-[#f7f7f7]">
      <div className="flex p-6 justify-between items-center">
        <div className="text-2xl font-extrabold">Hàng hóa</div>
        <div className="flex items-center gap-2">
          {isAnyRowChecked && (
            <li
            className="p-4 lg:px-8 relative flex items-center space-x-1"
            onMouseEnter={() => setFlyOutActions(true)}
            onMouseLeave={() => setFlyOutActions(false)}
          >
            <a
              className="text-slate-800 hover:text-slate-900"
              aria-expanded={flyOutActions}
            >
              Thao tác
            </a>
            <button
              className="shrink-0 p-1"
              aria-expanded={flyOutActions}
              onClick={(e) => {
                e.preventDefault();
                setFlyOutActions(!flyOutActions);
              }}
            >
              <span className="sr-only">Show submenu for "Flyout Menu"</span>
              <svg
                className="w-3 h-3 fill-slate-500"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
              >
                <path d="M10 2.586 11.414 4 6 9.414.586 4 2 2.586l4 4z" />
              </svg>
            </button>
            
            {/* 2nd level menu */}
            {flyOutActions && (
              <ul
                className="origin-top-right absolute top-full left-1/2 -translate-x-1/2 w-[120px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl"
              >
                <li>
                  <button className="text-slate-800 text-center w-[100px] hover:bg-slate-50 p-2">
                    Xóa hàng
                  </button>
                </li>
              </ul>
              /* Thêm action ở đây */
            )}
          </li>
          )}
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
              className="p-2 bg-transparent"
              type="text"
              placeholder="Tìm kiếm"
            />
          </div>

          <div>
            <button
              className="flex items-center border rounded-md px-2 shadow-sm"
              onClick={toggleFilterDropdown}
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
              <div
                ref={filterRef}
                className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg divide-y-2"
              >
                <div className="p-2">
                  <p className="font-bold m-2 px-2">Loại hàng hóa</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Hàng hóa thường</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Chế biến</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Dịch vụ</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Combo - Đóng gói</span>
                  </label>
                </div>
                <div className="p-2">
                  <p className="font-bold ml-2 px-2">Tình trạng</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Đang kinh doanh</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Ngừng kinh doanh</span>
                  </label>
                </div>
                <div className="p-2">
                  <p className="font-bold ml-2 px-2">Giá vốn</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      className="form-input border w-full"
                      placeholder="0"
                    />
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      className="form-input border w-full"
                      placeholder="9999999999"
                    />
                  </label>
                </div>
                <div className="p-2">
                  <p className="font-bold ml-2 px-2">Giá bán</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="text" className="form-input border w-full" />
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="text" className="form-input border w-full" />
                  </label>
                </div>
              </div>
            )}
          </div>
          <button
            className="flex items-center border rounded-md px-2 shadow-sm bg-black"
            onClick={toggleAddingNewOpen}
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
            <div className="p-2 text-sm font-bold text-white">Tạo mới</div>
          </button>
          {isAddingNewOpen && (
            <div className="absolute mt-2 w-4/5 top-4  left-[272px] bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="border-b-2 bg-[#f0efeb] px-4 py-6 font-bold">
                Thêm hàng hóa
              </div>
              <div className="flex pt-3">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-4 w-28">Mã hàng hóa</div>
                  <input
                    className="border-b-2 w-64 h-fit"
                    placeholder="Mã tự động sinh"
                  ></input>
                </div>
                <div className="flex items-center gap-3 pl-3">
                  <div className="px-2 py-4">Giá vốn</div>
                  <input className="border-b-2 w-40 h-fit"></input>
                </div>
              </div>
              <div className="flex">
                <div className="flex items-center gap-3">
                  <div className="px-2 py-4 w-28">Tên hàng</div>
                  <input className="border-b-2 w-64 h-fit"></input>
                </div>
                <div className="flex items-center gap-3 pl-3">
                  <div className="px-2 py-4">Giá bán</div>
                  <input className="border-b-2 w-40 h-fit"></input>
                </div>
              </div>
              <div className="flex items-center">
                <div className="px-2 py-4 w-28">Loại hàng</div>
                <select class="w- h-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Chọn loại hàng</option>
                  <option value="Type1">Type1</option>
                  <option value="Type2">Type2</option>
                  <option value="Type3">Type3</option>
                  <option value="Type4">Type4</option>
                </select>
              </div>
              <div className="flex right-0 justify-end pb-8 pr-8">
                <div className="flex gap-4">
                  <button
                    className="p-2 bg-black rounded-xl font-semibold text-white"
                    onClick={toggleAddingNewOpen}
                  >
                    Lưu
                  </button>
                  <button
                    className="p-2 border rounded-xl"
                    onClick={toggleAddingNewOpen}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
            {displayedData.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  key={row.id}
                  className={` border-b-2 cursor-pointer ${
                    checkedRows[row.id] ? "bg-gray-100" : ""
                  }`}
                  onClick={(e) => {
                    // Ignore click on checkboxes and action buttons
                    if (
                      e.target.type === "checkbox" ||
                      e.target.tagName.toLowerCase() === "button" ||
                      e.target.closest("button")
                    ) {
                      return;
                    }
                    handleRowClick(row.id); // Expand or collapse row
                  }}
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={checkedRows[row.id] || false}
                      onChange={() => handleRowCheckboxChange(row.id)}
                    />
                  </td>
                  <td className="px-4 py-2">{row.code}</td>
                  <td className="px-4 py-2">
                    {editingRow === row.id ? (
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) =>
                          handleEditInputChange(e, "name", row.id)
                        }
                        className="w-full"
                      />
                    ) : (
                      row.name
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === row.id ? (
                      <input
                        type="text"
                        value={row.type}
                        onChange={(e) =>
                          handleEditInputChange(e, "type", row.id)
                        }
                        className="w-full"
                      />
                    ) : (
                      row.type
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === row.id ? (
                      <input
                        type="text"
                        value={row.price}
                        onChange={(e) =>
                          handleEditInputChange(e, "price", row.id)
                        }
                        className="w-full"
                      />
                    ) : (
                      row.price
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === row.id ? (
                      <input
                        type="text"
                        value={row.cost}
                        onChange={(e) =>
                          handleEditInputChange(e, "cost", row.id)
                        }
                        className="w-full"
                      />
                    ) : (
                      row.cost
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === row.id ? (
                      <input
                        type="text"
                        value={row.stock}
                        onChange={(e) =>
                          handleEditInputChange(e, "stock", row.id)
                        }
                        className="w-full"
                      />
                    ) : (
                      row.stock
                    )}
                  </td>
                  <td></td>
                </tr>
                {/* Detail row */}
                {expandedRow === row.id && (
                  <tr>
                    <td colSpan={7} className="bg-gray-50 p-4">
                      {/* Detailed information and editable fields */}
                      <div className="space-y-2">
                        <div className="flex space-x-4">
                          <label
                            htmlFor={`edit-name-${row.id}`}
                            className="w-64"
                          >
                            Tên hàng:
                            <input
                              id={`edit-name-${row.id}`}
                              type="text"
                              value={row.name}
                              onChange={(e) =>
                                handleEditInputChange(e, "name", row.id)
                              }
                              className="w-full border p-1 rounded-xl"
                            />
                          </label>
                          <label
                            htmlFor={`edit-type-${row.id}`}
                            className="w-64"
                          >
                            Loại hàng:
                            <input
                              id={`edit-type-${row.id}`}
                              type="text"
                              value={row.type}
                              onChange={(e) =>
                                handleEditInputChange(e, "type", row.id)
                              }
                              className="w-full border p-1 rounded-xl"
                            />
                          </label>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-4">
                            <label
                              htmlFor={`edit-price-${row.price}`}
                              className="w-64"
                            >
                              Giá bán
                              <input
                                id={`edit-name-${row.price}`}
                                type="text"
                                value={row.price}
                                onChange={(e) =>
                                  handleEditInputChange(e, "price", row.id)
                                }
                                className="w-full border p-1 rounded-xl"
                              />
                            </label>
                            <label
                              htmlFor={`edit-cost-${row.id}`}
                              className="w-64"
                            >
                              Giá vốn
                              <input
                                id={`edit-cost-${row.id}`}
                                type="text"
                                value={row.cost}
                                onChange={(e) =>
                                  handleEditInputChange(e, "cost", row.id)
                                }
                                className="w-full border p-1 rounded-xl"
                              />
                            </label>
                            <label
                              htmlFor={`edit-stock-${row.id}`}
                              className="w-64"
                            >
                              Tồn kho
                              <input
                                id={`edit-stock-${row.id}`}
                                type="text"
                                value={row.stock}
                                onChange={(e) =>
                                  handleEditInputChange(e, "stock", row.id)
                                }
                                className="w-full border p-1 rounded-xl"
                              />
                            </label>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleRowClick(row.id)}
                              className="border rounded-md px-2 shadow-sm bg-black text-white"
                            >
                              Lưu
                            </button>
                            <button
                              onClick={() => handleRowClick(row.id)}
                              className="border rounded-md px-2 shadow-sm"
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                        <div className="w-64">
                          <label
                            htmlFor={`edit-stock-${row.id}`}
                            className="w-64"
                          >
                            Tình trạng
                            <select
                              id={`edit-stock-${row.id}`}
                              value={row.state}
                              onChange={(e) =>
                                handleEditInputChange(e, "state", row.id)
                              }
                              className="w-full border p-1 rounded-xl"
                            >
                              <option value="Available">
                                {" "}
                                Đang kinh doanh
                              </option>
                              <option value="Unavailable">
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
    </div>
  );
};

export default ProductsPage;

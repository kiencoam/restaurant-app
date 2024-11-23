"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const PurchaseOrderPage = () => {
  const data = [
    {
      id: "PN000052",
      time: "06/11/2024 16:46",
      supplier: "Cửa hàng Đại Việt",
      amount: "100,500",
      status: "Phiếu tạm",
      receiver: "qaxxx",
      items: [
        {
          code: "SP000006",
          name: "CBánh mỳ bò lò đậm bổng & phomai",
          quantity: 1,
          unitPrice: "100,500",
          totalPrice: "100,500",
        },
      ],
      summary: {
        totalQuantity: 1,
        totalItems: 1,
        totalAmount: "100,500",
        grandTotal: "100,500",
        paidAmount: "100,500",
      },
      note: "",
    },
    {
      id: "PN000051",
      time: "06/11/2024 15:18",
      supplier: "Công ty Hoàng Gia",
      amount: "76,500",
      status: "Đã nhập hàng",
      receiver: "nvabc",
      items: [
        {
          code: "SP000007",
          name: "Bánh ngọt ABC",
          quantity: 2,
          unitPrice: "38,250",
          totalPrice: "76,500",
        },
      ],
      summary: {
        totalQuantity: 2,
        totalItems: 1,
        totalAmount: "76,500",
        grandTotal: "76,500",
        paidAmount: "76,500",
      },
      note: "Ghi chú đặc biệt",
    },
    {
      id: "PN000050",
      time: "05/11/2024 12:00",
      supplier: "Công ty A",
      amount: "50,000",
      status: "Đã hủy",
      receiver: "userabc",
      items: [
        {
          code: "SP000008",
          name: "Bánh mặn",
          quantity: 3,
          unitPrice: "16,667",
          totalPrice: "50,000",
        },
      ],
      summary: {
        totalQuantity: 3,
        totalItems: 1,
        totalAmount: "50,000",
        grandTotal: "50,000",
        paidAmount: "50,000",
      },
      note: "",
    },
  ];

  const [expandedRows, setExpandedRows] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchOptionsOpen, setSearchOptionsOpen] = useState(false);
  const filterRef = useRef(null);

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRowClick = (id) => {
    if (expandedRows === id) {
      setExpandedRows(null); // Collapse the row if it's already expanded
    } else {
      setExpandedRows(id); // Expand the clicked row
    }
  };

  const toggleSearchOptions = () => {
    setSearchOptionsOpen((prev) => !prev);
  };

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
  return (
    <div className="w-full h-screen font-nunito bg-[#f7f7f7]">
      <div className="flex p-6 justify-between items-center">
        <div className="text-2xl font-extrabold">Phiếu nhập hàng</div>
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
              placeholder="Theo tên NCC, tên hàng"
            />
            <button onClick={() => setSearchOptionsOpen(!searchOptionsOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
            </button>
          </div>
          {searchOptionsOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Search Options</h2>
                <form>
                  <input
                    placeholder="Theo mã phiếu đặt"
                    className="p-2 mb-2 outline-none border-b-2"
                  ></input>
                  <input
                    placeholder="Theo mã, tên hàng"
                    className="p-2 mb-2 outline-none border-b-2"
                  ></input>
                  <input
                    placeholder="Theo mã, tên NCC"
                    className="p-2 mb-2 outline-none border-b-2"
                  ></input>
                  <input
                    placeholder="Theo ghi chú"
                    className="p-2 mb-2 outline-none border-b-2"
                  ></input>
                  <input
                    placeholder="Theo người nhập"
                    className="p-2 mb-2 outline-none border-b-2"
                  ></input>
                  <div className="flex justify-end">
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="p-2 bg-black text-white rounded mb-2"
                        onClick={toggleSearchOptions}
                      >
                        Tìm kiếm
                      </button>
                      <button
                        className="p-2 rounded mb-2"
                        onClick={toggleSearchOptions}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
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
                  <p className="font-bold m-2 px-2">Trạng thái</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Phiếu tạm</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Đã nhập hàng</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Đã hủy</span>
                  </label>
                </div>

                <div className="p-2">
                  <p className="font-bold ml-2 px-2">Thời gian</p>
                  <label className="flex items-center space-x-2 mt-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Toàn thời gian</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      className="form-input border w-full p-2 outline-none"
                      placeholder="Từ ngày dd/mm//yyyy"
                    />
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      className="form-input border w-full p-2 outline-none"
                      placeholder="Đến ngày dd/mm//yyyy"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
          <Link href="/home/purchase-order/new">
            <button className="flex items-center border rounded-md px-2 shadow-sm bg-black">
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
              <div className="p-2 text-sm font-bold text-white">Nhập hàng</div>
            </button>
          </Link>
        </div>
      </div>
      <div className="m-[24px] border border-gray-300 rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-3 border w-[140px]">Mã nhập hàng</th>
              <th className="p-3 border w-[145px]">Thời gian</th>
              <th className="p-3 border w-[401px]">Nhà cung cấp</th>
              <th className="p-3 border w-[130px]">Cần trả NCC</th>
              <th className="p-3 border w-[160px]">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                <tr
                  onClick={() => {
                    handleRowClick(item.id); // Expand or collapse row
                  }}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="p-3 border ">{item.id}</td>
                  <td className="p-3 border ">{item.time}</td>
                  <td className="p-3 border">{item.supplier}</td>
                  <td className="p-3 border ">{item.amount}</td>
                  <td className="p-3 border ">{item.status}</td>
                </tr>
                {expandedRows === item.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={5} className="p-3 border">
                      <div className="p-4 bg-gray-100 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p>
                              <strong>Mã phiếu nhập:</strong> {item.id}
                            </p>
                            <p>
                              <strong>Thời gian:</strong> {item.time}
                            </p>
                            <p>
                              <strong>Nhà cung cấp:</strong> {item.supplier}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Trạng thái:</strong> {item.status}
                            </p>

                            <p>
                              <strong>Người nhập:</strong> {item.receiver}
                            </p>
                            <p>
                              <strong>Ghi chú:</strong> {item.note || ""}
                            </p>
                          </div>
                        </div>
                        <table className="w-full mt-2 border-collapse">
                          <thead>
                            <tr className="bg-blue-100 text-left">
                              <th className="p-2 border w-[140px]">
                                Mã hàng hóa
                              </th>
                              <th className="p-2 border">Tên hàng</th>
                              <th className="p-2 border">Số lượng</th>
                              <th className="p-2 border">Đơn giá</th>
                              <th className="p-2 border">Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.items.map((product, index) => (
                              <tr key={index}>
                                <td className="p-2 border">{product.code}</td>
                                <td className="p-2 border">{product.name}</td>
                                <td className="p-2 border ">
                                  {product.quantity}
                                </td>
                                <td className="p-2 border ">
                                  {product.unitPrice}
                                </td>

                                <td className="p-2 border ">
                                  {product.totalPrice}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-4 text-right">
                          <p>
                            <strong>Tổng số lượng:</strong>{" "}
                            {item.summary.totalQuantity}
                          </p>
                          <p>
                            <strong>Tổng số mặt hàng:</strong>{" "}
                            {item.summary.totalItems}
                          </p>
                          <p>
                            <strong>Tổng tiền hàng:</strong>{" "}
                            {item.summary.totalAmount}
                          </p>
                          <p>
                            <strong>Tổng cộng:</strong>{" "}
                            {item.summary.grandTotal}
                          </p>
                          <p>
                            <strong>Tiền đã trả NCC:</strong>{" "}
                            {item.summary.paidAmount}
                          </p>
                        </div>
                        <div className="flex justify-end gap-4 mt-4">
                          {item.status !== "Đã hủy" && (
                            <>
                              <button
                                onClick={() => handleRowClick(item.id)}
                                className="border rounded-md px-2 shadow-sm bg-black text-white"
                              >
                                Lưu
                              </button>
                              {item.status === "Phiếu tạm" && (
                                <Link href = "/home/purchase-order/open">
                                <button className="border rounded-md px-2 shadow-sm bg-blue-500 text-white">
                                  Mở phiếu
                                </button>
                                </Link>
                              )}
                              {item.status === "Đã nhập hàng" && (
                                <Link href = "/home/purchase-order/return">
                                <button className="border rounded-md px-2 shadow-sm bg-red-500 text-white">
                                  Trả hàng
                                </button>
                                </Link>
                              )}
                            </>
                          )}
                          <button
                            onClick={() => handleRowClick(item.id)}
                            className="border rounded-md px-2 shadow-sm"
                          >
                            Hủy
                          </button>
                        </div>
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

export default PurchaseOrderPage;

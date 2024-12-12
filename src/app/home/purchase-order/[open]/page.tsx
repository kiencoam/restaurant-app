"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Tooltip } from "react-tooltip";
import { useRouter } from 'next/router';
import Link from "next/link";
import { getAllStockHistories, StockHistoryEntity, UpdateStockHistoryRequest, UpdateStockHistoryItemRequest, updateStockHistory, StockHistoryItemEntity } from "@/app/api-client/StockHistoryService";
import ProductForm from "../../products/ProductForm";
import { getAllProducts, ProductEntity } from "@/app/api-client/ProductService";
import StockHistoryInfo from "./StockHistoryInfo";


const OpenPage = ({ params }: { params: { open: string } }) => {
  //lấy [open] làm code 
  //sửa middleware trước khi test vì không mở được dynamic route
  const [stockHistory, setStockHistory] = useState<StockHistoryEntity>(null)

  const [isAddingNewOpen, setIsAddingNewOpen] = useState(false);
  //add product
  const [products, setProducts] = useState<ProductEntity[]>([]);

  const [getProductRequest, setGetProductRequest] = useState("")

  const stockHistoryItem = stockHistory.stockHistoryItems

  const UpdateStockHistoryItem: UpdateStockHistoryItemRequest[] = stockHistoryItem.map(prev => {
    return {
      productId: prev.productId,
      quantity: prev.quantity,
      pricePerUnit: prev.pricePerUnit,
    }
  })

  //Fetch stock history
  const buildQueryParams = (open: string) => `page=0&page_size=1&code=${open}`;

  const fetchStockHistories = useCallback(async (open: string) => {
    const queryParams = buildQueryParams(open);

    try {
      const res = await getAllStockHistories(queryParams);
      if (res && res.second) {
        setStockHistory(res.second);
      } else {
        console.error("No valid data found in response.");
      }
    } catch (error) {
      console.error("Error fetching stock histories:", error);
    }
  }, []);

  useEffect(() => {
    if (params.open) {
      fetchStockHistories(params.open);
    }
  }, [params.open, fetchStockHistories]);



  // QUERYPARAMS FOR PRODUCT
  const buildQueryProduct = useCallback(() => {
    let queryParams = `page=0&page_size=5`
    if (getProductRequest.trim() !== "") {
      queryParams = queryParams.concat(`&name=${getProductRequest}`)
    }
    return queryParams;
  }, [getProductRequest])

  useEffect(() => {
    // Lỗi fetch 2 lần do strict mode
    const fecthProducts = (queryParams: string) => {
      getAllProducts(queryParams).then(res => setProducts(res.second))
    }
    fecthProducts(buildQueryProduct())
  }, [buildQueryProduct])



  const handlePriceForUnitChange = (id, newPricePerUnit) => {
    setStockHistory((prev) => {
      return {
        ...prev,
        stockHistoryItem: stockHistoryItem.map((item) =>
          item.id === id
            ? { ...item, pricePerUnit: Math.max(0, newPricePerUnit) }
            : item
        )
      }
    });
  };

  const calculateTotal = (pricePerUnit, quantity) => {
    return pricePerUnit * quantity;
  };

  const handleQuantityChange = (id, newQuantity) => {
    setStockHistory((prev) => {
      return {
        ...prev,
        stockHistoryItems: stockHistoryItem.map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: Math.max(0, newQuantity), // Ensure quantity stays within range
            }
            : item
        )
      }
    });
  };

  const handlePickProduct = (product: ProductEntity) => {
    // setGetProductRequest(product.name);
    setGetProductRequest("");
    setStockHistory({
      ...stockHistory,
      stockHistoryItems: [...stockHistoryItem, {
        id: 0,
        stockHistoryId: 0,
        productId: product.id,
        quantity: 1,
        pricePerUnit: product.costPrice,
        product: product,
      }]
    })
  }

  const handleUpdateStockHistory = async (id: number, status: string, updatedStockHistory: StockHistoryEntity) => {

    const updateStockRequest: UpdateStockHistoryRequest = {
      supplierId: updatedStockHistory.supplierId,
      userId: updatedStockHistory.userId,
      code: updatedStockHistory.code,
      status: status,
      note: updatedStockHistory.note,
      stockHistoryItems: UpdateStockHistoryItem
    }

    try {
      const response = await updateStockHistory(id, updateStockRequest)
      console.log(response)
      // fecthProducts()
    } catch (e) {
      console.log(e)
    }
  };

  const toggleAddingNewOpen = () => {
    setIsAddingNewOpen(!isAddingNewOpen);
  };

  // Calculate total price of all items
  const totalAmount = stockHistoryItem.reduce(
    (sum, item) => sum + calculateTotal(item.pricePerUnit, item.quantity),
    0
  );

  return (
    <div className="flex w-full h-screen font-nunito bg-[#f7f7f7]">
      {/* Left section for table and search bar */}
      <div className="p-6">
        <div className="flex items-center gap-2 ">
          <Link href="/home/purchase-order/">
            <button
              className="hover:bg-gray-400"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Trở về"
            >
              <Tooltip id="my-tooltip" />
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
          </Link>
          <div className="text-2xl font-bold w-[180px]">Nhập hàng</div>
          <div className="flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[450px]">
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
              className="p-2 bg-transparent outline-none w-full"
              type="text"
              placeholder="Tìm hàng hóa theo mã hoặc theo tên"
              onChange={(e) => setGetProductRequest(e.target.value)}
            />
            {/* Hiển thị gợi ý */}
            {products.length > 0 && (
              <div className="absolute bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto w-full z-10">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handlePickProduct(product); // Điền tên vào input
                    }}
                  >
                    {product.name}
                  </div>
                ))}
              </div>
            )}
            {getProductRequest.length == 0 ?
              (<button
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Thêm hàng hóa mới"
                onClick={toggleAddingNewOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
              </button>) :
              (<button
                data-tooltip-id="delete-tooltip"
                data-tooltip-content="Xóa hàng hóa"
                onClick={() => { setGetProductRequest("") }}
              >
                X
              </button>
              )}
            {isAddingNewOpen &&
              <ProductForm
                toggleAddingNewOpen={toggleAddingNewOpen}
              />}
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full border mt-6">
          <thead className="bg-[#f7fafc] text-[13px]">
            <tr>
              <th className="px-4 py-2 text-left">STT</th>
              <th className="px-4 py-2 text-left w-[110px]">Mã hàng hóa</th>
              <th className="px-4 py-2 text-left">Tên hàng</th>
              <th className="px-4 py-2 text-right w-[98px]">Số lượng</th>
              <th className="px-4 py-2 text-right w-[120px]">Đơn giá</th>
              <th className="px-4 py-2 text-right w-[120px]">Thành tiền</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {stockHistoryItem.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{item.product.code}</td>
                <td className="px-4 py-2">{item.product.name}</td>
                <td className="px-4 py-2 text-center">
                  {/* Input for quantity to return */}
                  <input
                    min="0"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                    className="w-full mb-[20px] text-right  p-1 border-b-2  outline-none bg-none focus:border-b-black"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  {/* Input for price per unit */}
                  <input
                    min="0"
                    value={item.pricePerUnit}
                    onChange={(e) =>
                      handlePriceForUnitChange(
                        item.id,
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full mb-[20px] text-right p-1 border-b-2  outline-none focus:border-b-black"
                  />
                </td>
                <td className="px-4 pt-2 pb-[26px] text-right">
                  {calculateTotal(
                    item.pricePerUnit,
                    item.quantity
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StockHistoryInfo
        totalAmount={totalAmount}
        handleUpdateStockHistory={handleUpdateStockHistory}
        stockHistory={stockHistory} />
    </div>
  );
};

export default OpenPage;

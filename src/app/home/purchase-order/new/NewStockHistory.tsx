"use client";
import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import ProductTable from "./ProductTable";
import { CreateProductRequest, getAllProducts, GetProductRequest, ProductEntity, updateProduct, UpdateProductRequest } from "@/app/api-client/ProductService";
import { createStockHistory, CreateStockHistoryItemRequest, CreateStockHistoryRequest, StockHistoryEntity } from "@/app/api-client/StockHistoryService";
import ProductForm from "../../products/ProductForm";
import { getAllSuppliers, SupplierEntity } from "@/app/api-client/SupplierService";
import SupplierForm from "./SupplierForm";
import { useRouter } from "next/navigation";
import { loginUserContext } from "@/components/LoginUserProvider";
// Mock data for table rows

export type CreateStockHistoryItemRequestv2 = {
  productId: number;
  quantity: number;
  pricePerUnit: number;
  product: ProductEntity;
}

const initialTableData: CreateStockHistoryItemRequestv2[] = []

const initialStockHistory: CreateStockHistoryRequest = {
  supplierId: 0,
  userId: 0,
  code: "",
  status: "",
  note: "",
  stockHistoryItems: [] as CreateStockHistoryItemRequest[],
}



const NewStockHistory = () => {

  const [stockHistory, setStockHistory] = useState<CreateStockHistoryRequest>(initialStockHistory);
  const [tableData, setTableData] = useState<CreateStockHistoryItemRequestv2[]>(initialTableData);
  // TO FETCH PRODUCTS AND SUPPLIERS
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierEntity[]>([]);
  // OPEN FORM
  const [isAddingNewSupplier, setIsAddingNewSupplier] = useState(false);
  const [isAddingNewOpen, setIsAddingNewOpen] = useState(false);
  // FIND 
  const [getProductRequest, setGetProductRequest] = useState("")
  const [getSupplierRequest, setGetSupplierRequest] = useState("")

  const router = useRouter()
  const id = useContext(loginUserContext).id
  
  // QUERYPARAMS FOR PRODUCT
  const buildQueryProduct = useCallback(() => {
    let queryParams = `page=0&page_size=5`
    if (getProductRequest.trim() !== "") {
      queryParams = queryParams.concat(`&name=${getProductRequest}`)
    }
    return queryParams;
  }, [getProductRequest])

  // QUERYPARAMS FOR SUPPLIER
  const buildQuerySupplier = useCallback(() => {
    let queryParams = `page=0&page_size=5`
    if (getSupplierRequest.trim() !== "") {
      queryParams = queryParams.concat(`&name=${getSupplierRequest}`)
    }
    return queryParams;
  }, [getSupplierRequest])

  useEffect(() => {
    // Lỗi fetch 2 lần do strict mode
    const fecthProducts = (queryParams) => {
      getAllProducts(queryParams).then(res => setProducts(res.second))
    }

    fecthProducts(buildQueryProduct())

    const fecthSuppliers = (queryParams) => {
      getAllSuppliers(queryParams).then(res => setSuppliers(res.second))
    }

    fecthSuppliers(buildQuerySupplier())

  }, [buildQueryProduct, buildQuerySupplier])



  console.log("products", products);
  console.log("suppliers", suppliers)

  const handlePickSupplier = (supplier: SupplierEntity) => {
    setGetSupplierRequest(supplier.name);
    setStockHistory({
      ...stockHistory,
      supplierId: supplier.id
    })

  }
  const handlePickProduct = (product: ProductEntity) => {
    // setGetProductRequest(product.name);
    setGetProductRequest("");
    setTableData((prev: CreateStockHistoryItemRequestv2[]) => [...prev, {
      productId: product.id,
      quantity: 1,
      pricePerUnit: product.costPrice,
      product: product,
    }])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    setStockHistory({ ...stockHistory, [key]: e.target.value });
  }

  const handleSubmit = (status: string) => {
    if (stockHistory.code == "" || tableData.length == 0 || stockHistory.supplierId == 0) {
      alert("Chưa nhập đủ thông tin")
    }
    setStockHistory({
      //Chưa có thông tin về user
      ...stockHistory,
      status: status,
      stockHistoryItems: tableData.map(data => {
        return {
          productId: data.productId,
          quantity: data.quantity,
          pricePerUnit: data.pricePerUnit,
        };
      }),
      userId:id
      
    })
    createStockHistory(stockHistory).then((res: StockHistoryEntity) => {
      console.log(res);
      //setStockHistories((prev: CreateStockHistoryRequest[]) => [res, ...prev]);
      //Fetchdata xuong setStockHistories
    })
    console.log(stockHistory)
    if (status == "Phiếu tạm") {
      router.push(`./home/purchase-order/${stockHistory.code}`)
    }
    else {
      router.push(`./home/purchase-order`)
    }
  }

  const toggleNewSupplier = () => {
    setIsAddingNewSupplier((prev) => !prev);
  };

  const date = new Date();
  const showTime =
    date.getDate() +
    "/" +
    (date.getMonth() + 1).toString() +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes();

  const handlePriceForUnitChange = (productId, newPricePerUnit) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.productId === productId
          ? { ...item, pricePerUnit: Math.max(0, newPricePerUnit) }
          : item
      )
    );
  };

  const calculateTotal = (pricePerUnit, quantity) => {
    return pricePerUnit * quantity;
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.productId === productId
          ? {
            ...item,
            quantity: Math.max(0, newQuantity), // Ensure quantity stays within range
          }
          : item
      )
    );
  };

  const toggleAddingNewOpen = () => {
    setIsAddingNewOpen(!isAddingNewOpen);
  };

  // Calculate total price of all items
  const totalAmount = tableData.reduce(
    (sum, item) => sum + calculateTotal(item.pricePerUnit, item.quantity),
    0
  );

  return (
    <div className="flex w-full h-screen font-nunito bg-[#f7f7f7]">
      {/* Left section for table and search bar */}
      <div className="p-6 w-2/3">
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
              value={getProductRequest}
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
                setProducts={setProducts}
              />}
          </div>
        </div>
        <ProductTable tableData={tableData}
          handleQuantityChange={handleQuantityChange}
          handlePriceForUnitChange={handlePriceForUnitChange}
          calculateTotal={calculateTotal} />
      </div>

      {/* Right section for detailed information */}
      <div className="w-1/3 p-6 mr-6 mt-6  bg-white text-[13px] h-3/5">
        <div className="text-right text-gray-500 mb-4">{showTime}</div>
        <div className="mb-4">
          <div className="flex items-center border-b-2 text-sm  bg-none px-2 ">
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
              placeholder="Tìm nhà cung cấp"
              value={getSupplierRequest}
              onChange={(e) => setGetSupplierRequest(e.target.value)}
            />
            {/* Hiển thị gợi ý */}
            {suppliers.length > 0 && (
              <div className="absolute bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto w-full z-10">
                {suppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handlePickSupplier(supplier)}
                  >
                    {supplier.name}
                  </div>
                ))}
              </div>
            )}
            {getSupplierRequest.length == 0 ?
              <button
                onClick={() => setIsAddingNewSupplier(!isAddingNewSupplier)}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Thêm nhà cung cấp mới"
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
              </button> :
              (<button
                data-tooltip-id="delete-tooltip"
                data-tooltip-content="Xóa nhà cung cấp"
                onClick={() => {
                  setGetSupplierRequest("");
                  setStockHistory({
                    ...stockHistory,
                    supplierId: 0
                  })
                }}
              >
                X
              </button>
              )}
            {isAddingNewSupplier &&
              <SupplierForm
                toggleNewSupplier={toggleNewSupplier}
                setSuppliers={setSuppliers}
              />}
          </div>
        </div>
        <div className="flex mb-4 justify-between">
          <label className="text-gray-700">Mã phiếu nhập</label>
          <input
            className="border-b-2  w-[140px]  outline-none focus:border-b-black pb-2"
            placeholder="Mã phiếu tự động"
            onChange={(e) => handleInputChange(e, "code")}
          />
        </div>
        <div className="flex mb-4 justify-between">
          <label className="text-gray-700">Trạng thái</label>
          <div className=" font-semibold">Phiếu tạm</div>
        </div>
        <div className="flex justify-between mb-4">
          <label className="text-gray-700">Tổng tiền hàng</label>
          <div className="font-semibold">{totalAmount.toLocaleString()}</div>
        </div>
        <div className="flex mb-4 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
          <textarea
            className="border-b-2 outline-none w-full focus:border-b-black"
            placeholder="Ghi chú"
            onChange={(e) => handleInputChange(e, "note")}
          />
        </div>
        <div className="flex justify-between mt-20">
          <button className="bg-blue-500 text-white px-4 py-2 rounded w-[130px]" onClick={() => handleSubmit("Phiếu tạm")}>
            Lưu tạm
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded w-[130px] " onClick={() => handleSubmit("Đã nhập hàng")}>
            Hoàn thành
          </button>
        </div>
      </div>
    </div >
  );
};

export default NewStockHistory;

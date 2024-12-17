"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import {
  CreateProductRequest,
  getAllProducts,
  ProductEntity,
  updateProduct,
  UpdateProductRequest,
} from "@/app/api-client/ProductService";
import {
  createStockHistory,
  CreateStockHistoryItemRequest,
  CreateStockHistoryRequest,
  getAllStockHistories,
  getDetailStockHistory,
  StockHistoryEntity,
  updateStockHistory,
  UpdateStockHistoryRequest,
} from "@/app/api-client/StockHistoryService";
import ProductForm from "../../products/ProductForm";
import {
  getAllSuppliers,
  SupplierEntity,
} from "@/app/api-client/SupplierService";
import { useRouter } from "next/navigation";
import { loginUserContext } from "@/components/LoginUserProvider";
import CreateSupplierForm from "../../supplier-management/create-supplier-form";
import { GetSupplierRequest } from "../../supplier-management/page";
import ProductTable from "./ProductTable";
import { StockHistoryRequest } from "../page";
import dayjs from "dayjs";
// Mock data for table rows

enum StockHistoryStatusEnum {
  Pending = "PENDING",
  Done = "DONE",
}

export type CreateStockHistoryItemRequestv2 = {
  productId: number;
  quantity: number;
  pricePerUnit: number;
  product: ProductEntity; //hiện thông tin product, xóa sau khi create api
};

const initialTableData: CreateStockHistoryItemRequestv2[] = [];

const initialStockHistory: CreateStockHistoryRequest = {
  supplierId: 0,
  userId: 0,
  code: "",
  status: "",
  note: "",
  stockHistoryItems: [] as CreateStockHistoryItemRequest[],
};

export type GetProductRequest = {
  page: number;
  page_size: number;
  name?: string;
  status?: string;
  price_from?: number;
  price_to?: number;
  sort_by?: string;
  sort_type?: string;
};

const OpenPage = (code: { code: string }) => {
  const [newStockHistory, setNewStockHistory] =
    useState<UpdateStockHistoryRequest>(initialStockHistory);
  const [tableData, setTableData] =
    useState<CreateStockHistoryItemRequestv2[]>(initialTableData);
  // TO FETCH PRODUCTS AND SUPPLIERS
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierEntity[]>([]);
  const [selectedSupplier, setSelectedSupplier] =
    useState<SupplierEntity>(null);
  // OPEN FORM
  const [isAddingNewSupplier, setIsAddingNewSupplier] = useState(false);
  const [isAddingNewOpen, setIsAddingNewOpen] = useState(false);
  // FIND
  const [getProductRequest, setGetProductRequest] = useState<GetProductRequest>(
    {
      page: 0,
      page_size: 5,
    }
  );

  const handleRemoveProduct = (productId) => {
    setTableData((prev: CreateStockHistoryItemRequestv2[]) =>
      prev.filter((it) => it.productId != productId)
    );
  };

  const [getSupplierRequest, setGetSupplierRequest] =
    useState<GetSupplierRequest>({
      page: 0,
      page_size: 5,
    });
  const [filter, setFilter] = useState<StockHistoryRequest>({
    page: 0,
    page_size: 5,
    code: code.code,
    from_date: new Date("2004/01/01"),
    to_date: new Date("2025/12/31"),
  });
  const [stockId, setStockId] = useState(0);

  const formatDate = (date: Date) => {
    if (!date) return null; // Kiểm tra đầu vào
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  };

  const router = useRouter();

  //lấy id làm userid
  const id = Number(useContext(loginUserContext).id);
  useEffect(() => {
    /* Gọi API */
    const query = Object.entries(filter)
      .filter(([key, value]) => value !== undefined && value !== "")
      .map(([key, value]) => {
        if (
          (key === "from_date" || key === "to_date") &&
          value instanceof Date
        ) {
          value = formatDate(value);
        }
        return `${key}=${value}`;
      })
      .join("&");

    getAllStockHistories(query)
      .then((res) => {
        if (res.second && res.second.length > 0) {
          const firstStockHistory = res.second[0];
          setStockId(firstStockHistory.id);
          setNewStockHistory({
            supplierId: firstStockHistory.supplierId,
            userId: firstStockHistory.userId,
            code: firstStockHistory.code,
            status: firstStockHistory.status,
            note: firstStockHistory.note,
            stockHistoryItems: [],
          });

          setTableData(
            firstStockHistory.stockHistoryItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              pricePerUnit: item.pricePerUnit,
              product: item.product,
            }))
          );
          setSelectedSupplier(firstStockHistory.supplier);
        } else {
          console.warn("No stock history found");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch stock histories:", error);
      });
  }, [filter]);

  useEffect(() => {
    const query = Object.entries(getProductRequest)
      .map(([key, value]) => {
        if (value || key === "page") {
          return `${key}=${value}`;
        }
      })
      .join("&");

    getAllProducts(query).then((data) => {
      setProducts(data.second);
    });
  }, [getProductRequest]);

  useEffect(() => {
    const query = Object.entries(getSupplierRequest)
      .map(([key, value]) => {
        if (value || key === "page") {
          return `${key}=${value}`;
        }
      })
      .join("&");

    getAllSuppliers(query).then((data) => {
      setSuppliers(data.second);
    });
  }, [getSupplierRequest]);

  const handlePickSupplier = (supplier: SupplierEntity) => {
    setGetSupplierRequest((prev) => ({ ...prev, name: "" }));
    setSelectedSupplier(supplier);
    setNewStockHistory({
      ...newStockHistory,
      supplierId: supplier.id,
    });
  };
  const handlePickProduct = (product: ProductEntity) => {
    // Reset state request (nếu cần)
    setGetProductRequest({
      page: 0,
      page_size: 5,
      name: "",
    });
    setTableData((prev: CreateStockHistoryItemRequestv2[]) => {
      const existingProductIndex = prev.findIndex(
        (item) => item.productId === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedTableData = [...prev];
        updatedTableData[existingProductIndex] = {
          ...updatedTableData[existingProductIndex],
          quantity: updatedTableData[existingProductIndex].quantity + 1,
        };
        return updatedTableData;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            quantity: 1,
            pricePerUnit: product.sellingPrice,
            product: product,
          },
        ];
      }
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setNewStockHistory({ ...newStockHistory, [key]: e.target.value });
  };

  const handleSubmit = (status: string) => {
    if (tableData.length == 0 || newStockHistory.supplierId == 0) {
      alert("Chưa nhập đủ thông tin");
    }
    const updatedStockHistory = {
      ...newStockHistory,
      status: status,
      stockHistoryItems: tableData.map((data) => ({
        productId: data.productId,
        quantity: data.quantity,
        pricePerUnit: data.pricePerUnit,
      })),
      userId: id,
    };

    console.log(updatedStockHistory);

    updateStockHistory(stockId, updatedStockHistory).then(
      (res: StockHistoryEntity) => {
        console.log(res);
        router.push(`./`);
      }
    );
  };

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
          <div className="relative flex items-center border text-sm rounded-md bg-[#f7fafc] px-2 shadow-sm w-[450px]">
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
            <div className="w-full">
              <input
                className="p-2 bg-gray-50 outline-none w-full focus:ring-1 focus:ring-blue-500 focus:border-blue-300"
                type="text"
                placeholder="Tìm hàng hóa theo mã hoặc theo tên"
                value={getProductRequest.name}
                onChange={(e) =>
                  setGetProductRequest({
                    ...getProductRequest,
                    name: e.target.value,
                  })
                }
              />
              {/* Hiển thị gợi ý */}
              {getProductRequest.name && (
                <div className="absolute top-full left-0 bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto w-full z-20 shadow-lg rounded-lg">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 text-sm font-medium transition-all duration-200"
                      onClick={() => {
                        handlePickProduct(product); // Điền tên vào input
                      }}
                    >
                      {product.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {getProductRequest.name ? (
              <button
                data-tooltip-id="delete-tooltip"
                data-tooltip-content="Xóa hàng hóa"
                onClick={() => {
                  setGetProductRequest({ ...getProductRequest, name: "" });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ) : (
              <button
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
              </button>
            )}
            {isAddingNewOpen && (
              <ProductForm
                toggleAddingNewOpen={toggleAddingNewOpen}
                setProducts={setProducts}
                setGetProductRequest={setGetProductRequest}
              />
            )}
          </div>
        </div>
        <ProductTable
          tableData={tableData}
          handleQuantityChange={handleQuantityChange}
          handlePriceForUnitChange={handlePriceForUnitChange}
          calculateTotal={calculateTotal}
          handleRemoveProduct={handleRemoveProduct}
        />
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
            <div className="relative w-full">
              {selectedSupplier ? (
                <div className="flex items-center justify-between p-2 rounded-lg">
                  <span className="text-gray-700 text-sm font-medium">
                    {selectedSupplier.name}
                  </span>
                </div>
              ) : (
                <div>
                  <input
                    className="p-2 rounded-lg outline-none w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="text"
                    placeholder="Tìm nhà cung cấp"
                    value={getSupplierRequest.name}
                    onChange={(e) =>
                      setGetSupplierRequest((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  {getSupplierRequest.name && (
                    <div className="absolute top-full left-0 bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto w-full z-20 shadow-lg rounded-lg">
                      {suppliers.map((supplier) => (
                        <div
                          key={supplier.id}
                          className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 text-sm font-medium transition-all duration-200"
                          onClick={() => handlePickSupplier(supplier)}
                        >
                          {supplier.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {getSupplierRequest.name || selectedSupplier ? (
              <button
                data-tooltip-id="delete-tooltip"
                data-tooltip-content="Xóa nhà cung cấp"
                onClick={() => {
                  if (selectedSupplier) {
                    setSelectedSupplier(null); // Xóa nhà cung cấp đã chọn
                  } else {
                    setGetSupplierRequest({ ...getSupplierRequest, name: "" });
                  }
                  setNewStockHistory((prev) => ({ ...prev, supplierId: null })); // Xóa supplierId
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ) : (
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
              </button>
            )}
            {isAddingNewSupplier && (
              <CreateSupplierForm
                toggleNewSupplier={toggleNewSupplier}
                setFilter={setGetSupplierRequest}
                pageSize={0}
                setSuppliers={setSuppliers}
              />
            )}
          </div>
        </div>
        <div className="flex mb-4 justify-between">
          <label className="text-gray-700">Mã phiếu nhập</label>
          <input
            className="border-b-2  w-[140px]  outline-none focus:border-b-black pb-2"
            placeholder="Mã phiếu tự động"
            value={newStockHistory.code}
            disabled
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
            value={newStockHistory.note}
            onChange={(e) => handleInputChange(e, "note")}
          />
        </div>
        <div className="flex justify-between mt-20">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-[130px]"
            onClick={() => handleSubmit(StockHistoryStatusEnum.Pending)}
          >
            Lưu tạm
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-[130px] "
            onClick={() => handleSubmit(StockHistoryStatusEnum.Done)}
          >
            Hoàn thành
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenPage;

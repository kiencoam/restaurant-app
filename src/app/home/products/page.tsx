"use client";

import React, { useState, useEffect, useRef } from "react";


import { getAllProducts, GetProductRequest, ProductEntity, updateProduct, UpdateProductRequest } from "../../api-client/ProductService";
import ProductForm from "./ProductForm";
import ProductFilterForm from "./ProductFilterForm";
import ProductList from "./ProductList";


const ProductsPage = () => {

  const [products, setProducts] = useState<ProductEntity[]>([]);

  const [flyOutActions, setFlyOutActions] = useState(false);

  const [expandedRow, setExpandedRow] = useState(null);
  const [pageSize, setpageSize] = useState(5); // Default to showing 5 rows
  const [totalRecords, setTotalRecords] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productStatus, setProductStatus] = useState(null);
  const [priceRange, setPriceRange] = useState([null, null]);

  const [editingRow, setEditingRow] = useState(null); // Track the currently editing row
  const [checkedRows, setCheckedRows] = useState({});
  const [masterChecked, setMasterChecked] = useState(false);
  const [productType, setProductType] = useState(""); // State to manage filter for 'Loại thực đơn'
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isAddingNewOpen, setIsAddingNewOpen] = useState(false);

  const [getProductRequest, setGetProductRequest] = useState<GetProductRequest>({
    page: 0,

    pageSize: 10,

    name: "",
    status: "",
    priceFrom: null,
    priceTo: null,
    sortBy: "",
    sortType: "",
  })

  const handleProductFilterChange = (e, field: string) => {
    setGetProductRequest({
      ...getProductRequest,
      [field]: e.target.value
    })
    console.log  (getProductRequest)
  }




  useEffect(() => {
    // fecthProducts()

    setProducts([
      {
        id: 1,
        name: "Thuốc lá Kent HD",
        code: "SP000001",
        description: "Thuốc lá Kent HD",
        costPrice: 20500,
        sellingPrice: 30000,
        thumbnailImg:
          "https://cleverads.vn/blog/wp-content/uploads/2023/10/thi-truong-healthy-food-1.jpg",
        status: "sale",
        productType: "Khác",
        stock: {
          id: 1,
          availableQuantity: 1000,
          soldQuantity: 0,
          productId: 1
        },
      },
      {
        id: 2,
        name: "Thuốc lá Marlboro",
        code: "SP000002",
        costPrice: 22500,
        description: "Thuốc lá Marlboro",
        sellingPrice: 35000,
        thumbnailImg: "",
        status: "stop",
        productType: "Khác",
        stock: {
          id: 2,
          soldQuantity: 0,
          productId: 2,
          availableQuantity: 1500,
        },
      },
    ]);
  }, [])

  const fecthProducts = async () => {
    getAllProducts("").then(res => setProducts(res))
  }

  console.log("products", products);

  console.log("expandedRow");


  const filterRef = useRef(null);

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRow((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

  const handleUpdateProduct = async (id: number) => {
    const selectedProduct = products.find((product) => product.id === id);

    const updateProductRequest: UpdateProductRequest = {
      name: selectedProduct.name,
      description: selectedProduct.description,
      code: selectedProduct.code,
      sellingPrice: selectedProduct.sellingPrice,
      thumbnailImg: selectedProduct.thumbnailImg,
      status: selectedProduct.status,
      productType: selectedProduct.productType,
      images: selectedProduct.images?.map(imageEntity => imageEntity.url)
    }

    try {
      const response = await updateProduct(id, updateProductRequest)
      console.log(response)
      // fecthProducts()
    } catch (e) {
      console.log(e)
    }

    handleRowClick(id)
  };

  const handleEditInputChange = (e, field, rowId) => {
    const newProducts = products.map((product) => {
      if (product.id === rowId) {
        return { ...product, [field]: e.target.value };
      }
      return product;
    })
    setProducts(newProducts);
  };

  const handleMasterCheckboxChange = () => {
    const newMasterChecked = !masterChecked;
    setMasterChecked(newMasterChecked);
    const newCheckedRows = {};
    products.forEach((product) => {
      newCheckedRows[product.id] = newMasterChecked;
    });
    setCheckedRows(newCheckedRows);
  };

  const handleRowCheckboxChange = (id) => {
    const newCheckedRows = { ...checkedRows, [id]: !checkedRows[id] };
    setCheckedRows(newCheckedRows);
    const allChecked = products.every((product) => newCheckedRows[product.id]);
    setMasterChecked(allChecked);
  };

  const isAnyRowChecked = Object.values(checkedRows).some(Boolean);

  const handleActionSelection = (action) => {
    // setSelectedAction(action);
    // if (action === "Xóa hàng hóa") {
    //   handleDeleteSelectedItems();
    // }
  };

  const handleDeleteSelectedItems = () => {
    // const newRows = data.filter((row) => !checkedRows[row.id]);
    // setData(newRows);
    // setCheckedRows({});
    // setMasterChecked(false);
    // setShowActionMenu(false);
  };

  const startIndex = (currentPage - 1) * pageSize;

  return (
    <div className="w-full h-screen font-nunito bg-[#f7f7f7]">
      <div className="flex p-6 justify-between items-center">
        <div className="text-2xl font-extrabold">Hàng hóa</div>
        <div className="flex items-center gap-2">
          {isAnyRowChecked && (
            <li

              className="lg:px-8 relative flex items-center space-x-1"

              onMouseEnter={() => setFlyOutActions(true)}
              onMouseLeave={() => setFlyOutActions(false)}
            >
              <a

                className="p-2 text-center hover:text-slate-900 h-[38px]"

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
                <span className="sr-only">Show submenu for &quot;Flyout Menu&quot;</span>
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
                <ul className="origin-top-right absolute top-full left-1/2 -translate-x-1/2 w-[120px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl">
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
              className="p-2 bg-transparent outline-none"
              type="text"
              placeholder="Tìm kiếm"
              value={getProductRequest.name}
              onChange={(e) => handleProductFilterChange(e, "name")}
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

            {isFilterOpen &&
              <ProductFilterForm
                filterRef={filterRef}
                getProductRequest={getProductRequest}
                handleProductFilterChange={handleProductFilterChange}
              />}
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

          {isAddingNewOpen && <ProductForm toggleAddingNewOpen={toggleAddingNewOpen} />}
        </div>
      </div>

      <ProductList 

        masterChecked={masterChecked}
        products={products}
        handleMasterCheckboxChange={handleMasterCheckboxChange}
        checkedRows={checkedRows}
        handleRowClick={handleRowClick}
        expandedRow={expandedRow}
        handleUpdateProduct={handleUpdateProduct}
        handleEditInputChange={handleEditInputChange}
        handleRowCheckboxChange={handleRowCheckboxChange}
        editingRow={editingRow}
      />
    </div>
  );
};



export default ProductsPage;

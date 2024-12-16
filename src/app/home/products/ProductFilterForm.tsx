export default function ProductFilterForm({
  filterRef,
  getProductRequest,
  handleProductFilterChange,
}) {
  return (
    <div
      ref={filterRef}
      className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg divide-y-2"
    >
      <div className="p-2">
        <p className="font-bold m-2 px-2">Loại hàng hóa</p>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="radio"
            className="form-radio"
            value=""
            name="product_type"
            onChange={(e) => handleProductFilterChange(e, "product_type")}
          />
          <span>Tất cả</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="radio"
            className="form-radio"
            value="INGREDIENT"
            name="product_type"
            onChange={(e) => handleProductFilterChange(e, "product_type")}
          />
          <span>Nguyên liệu thô</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="radio"
            className="form-radio"
            value="READY_TO_EAT"
            name="product_type"
            onChange={(e) => handleProductFilterChange(e, "product_type")}
          />
          <span>Chế biến sẵn</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="radio"
            className="form-radio"
            value="PROCESSED_FOOD"
            name="product_type"
            onChange={(e) => handleProductFilterChange(e, "product_type")}
          />
          <span>Món ăn chế biến</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="radio"
            className="form-radio"
            value="DRINK"
            name="product_type"
            onChange={(e) => handleProductFilterChange(e, "product_type")}
          />
          <span>Đồ uống</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="radio"
            className="form-radio"
            value="UTENSILS"
            name="product_type"
            onChange={(e) => handleProductFilterChange(e, "product_type")}
          />
          <span>Dụng cụ</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="radio"
            className="form-radio"
            value="OTHER"
            name="product_type"
            onChange={(e) => handleProductFilterChange(e, "product_type")}
          />
          <span>Khác</span>
        </label>
      </div>
      <div className="p-2">
        <p className="font-bold ml-2 px-2">Tình trạng</p>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="radio"
            className="form-radio"
            value="ACTIVE"
            name="status"
            onChange={(e) => handleProductFilterChange(e, "status")}
          />
          <span>Đang kinh doanh</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="radio"
            className="form-radio"
            value="INACTIVE"
            name="status"
            onChange={(e) => handleProductFilterChange(e, "status")}
          />
          <span>Ngừng kinh doanh</span>
        </label>
      </div>
      <div className="p-2">
        <p className="font-bold ml-2 px-2">Giá bán</p>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            className="form-input border-b-2 focus:border-b-black outline-none w-full"
            placeholder="0"
            value={getProductRequest.priceFrom}
            onChange={(e) => handleProductFilterChange(e, "priceFrom")}
          />
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="text"
            className="form-input border-b-2 focus:border-b-black outline-none w-full"
            placeholder="9999999999"
            value={getProductRequest.priceTo}
            onChange={(e) => handleProductFilterChange(e, "priceTo")}
          />
        </label>
      </div>
    </div>
  );
}

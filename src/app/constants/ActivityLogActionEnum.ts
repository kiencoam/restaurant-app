enum ActivityLogActionEnum {
    SellOrder = "SELL_ORDER",
    ImportProduct = "IMPORT_PRODUCT"
}

// logs "SellOrder"
console.log(ActivityLogActionEnum.SellOrder);
// logs "ImportProduct"
console.log(ActivityLogActionEnum.ImportProduct);
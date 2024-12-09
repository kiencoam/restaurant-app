enum StockHistoryStatusEnum {
    Pending = "PENDING",
    Processing = "PROCESSING",
    Done = "DONE"
}

// logs "PENDING"
console.log(StockHistoryStatusEnum.Pending);
// logs "PROCESSING"
console.log(StockHistoryStatusEnum.Processing);
// logs "DONE"
console.log(StockHistoryStatusEnum.Done);

enum OrderItemStatusEnum {
    Pending = "PENDING",
    InProgress = "IN_PROGRESS",
    Done = "DONE"
}

// logs "PENDING"
console.log(OrderItemStatusEnum.Pending);
// logs "IN_PROGRESS"
console.log(OrderItemStatusEnum.InProgress);
// logs "DONE"
console.log(OrderItemStatusEnum.Done);

enum OrderStatusEnum {
    Confirmed = "CONFIRMED",
    CheckedIn = "CHECKED_IN",
    Abandoned = "ABANDONED",
    Cancelled = "CANCELLED",
    Completed = "COMPLETED"
}

// logs "CONFIRMED"
console.log(OrderStatusEnum.Confirmed);
// logs "CHECKED_IN"
console.log(OrderStatusEnum.CheckedIn);
// logs "ABANDONED"
console.log(OrderStatusEnum.Abandoned);
// logs "CANCELLED"
console.log(OrderStatusEnum.Cancelled);
// logs "COMPLETED"
console.log(OrderStatusEnum.Completed);

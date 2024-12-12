enum OrderItemKitchenStatusEnum {
    Pending = "PENDING",
    Ready = "READY",
    Delivered = "DELIVERED"
}

// logs "PENDING"
console.log(OrderItemKitchenStatusEnum.Pending);
// logs "READY"
console.log(OrderItemKitchenStatusEnum.Ready);
// logs "DELIVERED"
console.log(OrderItemKitchenStatusEnum.Delivered);

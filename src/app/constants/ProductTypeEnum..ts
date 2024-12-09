enum ProductTypeEnum {
    Food = "FOOD",
    Drink = "DRINK",
    ProcessedFood = "PROCESSED_FOOD",
    Ingredient = "INGREDIENT",
    ReadyToEat = "READY_TO_EAT",
    Utensils = "UTENSILS",
    Other = "OTHER"
}

// logs "FOOD"
console.log(ProductTypeEnum.Food);
// logs "DRINK"
console.log(ProductTypeEnum.Drink);
// logs "PROCESSED_FOOD"
console.log(ProductTypeEnum.ProcessedFood);
// logs "INGREDIENT"
console.log(ProductTypeEnum.Ingredient);
// logs "READY_TO_EAT"
console.log(ProductTypeEnum.ReadyToEat);
// logs "UTENSILS"
console.log(ProductTypeEnum.Utensils);
// logs "OTHER"
console.log(ProductTypeEnum.Other);

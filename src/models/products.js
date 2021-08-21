export class Product {
    constructor(productId,
        productName,
        productCode,
        price,
        description,
        imageUrl, manufacturer) {
        this.productId = productId;
        this.productName = productName;
        this.productCode = productCode;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.manufacturer = manufacturer;
    }
}

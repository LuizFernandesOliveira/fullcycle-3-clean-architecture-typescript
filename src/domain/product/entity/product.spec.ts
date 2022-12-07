import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Product("", "Product", 20)).toThrowError("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Product("123", "", 20)).toThrowError("product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => new Product("123", "Produc", -1)).toThrowError("Price is not less than zero");
  });

  it("should throw error when all fields is invalid", () => {
    expect(() => new Product("", "", -1)).toThrowError("product: Id is required,product: Name is required,product: Price is not less than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product", 20);
    product.changeName("Product 1");
    expect(product.name).toBe("Product 1");
  });

  it("should change price", () => {
    const product = new Product("123", "Product", 20);
    product.changePrice(30);
    expect(product.price).toBe(30);
  });
});
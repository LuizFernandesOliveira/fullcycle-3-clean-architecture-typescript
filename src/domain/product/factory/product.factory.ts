import Product from "../entity/product";
import { v4 as uuid } from "uuid";
import ProductInterface from "../entity/produc.interface";
import ProductB from "../entity/product-b";

export default class ProductFactory {
  public static createByType(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }

  public static create(name: string, price: number): Product {
    return new Product(uuid(), name, price);
  }
}
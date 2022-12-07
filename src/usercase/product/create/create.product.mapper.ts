import Product from "../../../domain/product/entity/product";
import {OutputCreateProductDto} from "./create.product.dto";

export default class CreateProductMapper {
  static toOutput(product: Product): OutputCreateProductDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}
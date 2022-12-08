import Product from "../../../domain/product/entity/product";
import {OutputFindProductDto} from "./find.product.dto";

export default class FindProductMapper {
  static toOutput(product: Product): OutputFindProductDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}
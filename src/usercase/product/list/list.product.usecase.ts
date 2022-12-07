import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {OutputListProductDto} from "./list.product.dto";
import {ListProductMapper} from "./list.product.mapper";

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return ListProductMapper.toOutput(products);
  }
}
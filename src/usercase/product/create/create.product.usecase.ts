import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputCreateProductDto, OutputCreateProductDto} from "./create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductMapper from "./create.product.mapper";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(input.name, input.price);
    await this.productRepository.create(product);
    return CreateProductMapper.toOutput(product);
  }
}
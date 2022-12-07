import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputUpdateProductDto, OutputUpdateProductDto} from "./update.product.dto";
import UpdateProductMapper from "./update.product.mapper";


export default class UpdateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.find(input.id);
    product.changeName(input.name);
    product.changePrice(input.price);
    await this.productRepository.update(product);
    return UpdateProductMapper.toOutput(product);
  }
}
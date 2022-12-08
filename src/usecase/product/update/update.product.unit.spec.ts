import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.createBy("Note 1", 10);

const input = {
  id: product.id,
  name: 'test',
  price: 20,
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const repository = MockRepository();
    const useCase = new UpdateProductUseCase(repository);
    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});
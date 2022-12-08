import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.createBy("Customer 1", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("unit test find product user case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindProductUseCase(customerRepository);

    const input = { id: product.id };
    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    }
    const result = await usecase.execute(input);
    expect(result).toStrictEqual(output);
  });

  it("should not found a product", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(customerRepository);

    const input = { id: "123" };

    await expect(() => usecase.execute(input)).rejects.toThrow("Product not found");
  });
});
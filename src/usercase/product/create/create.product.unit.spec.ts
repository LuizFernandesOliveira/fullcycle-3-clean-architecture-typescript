import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: 'test',
  price: 10,
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateProductUseCase(customerRepository);
    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateProductUseCase(customerRepository);
    input.name = "";
    await expect(() => customerCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is less than zero", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new CreateProductUseCase(customerRepository);
    input.name = "test";
    input.price = 0;
    await expect(() => customerCreateUseCase.execute(input)).rejects.toThrow("Price is not less than zero");
  });
})
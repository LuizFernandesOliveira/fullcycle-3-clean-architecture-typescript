import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "./create.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

const input = {
  name: 'test',
  price: 10,
}

describe("Integration test create product user case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  it("should create a product", async () => {
    const repository = new ProductRepository();

    const usecase = new CreateProductUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
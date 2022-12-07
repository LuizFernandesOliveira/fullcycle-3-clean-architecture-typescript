import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Integration test find product user case", () => {
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

  it("should update a product", async () => {
    const product = ProductFactory.create("Note 1", 10);

    const repository = new ProductRepository();

    const usecase = new UpdateProductUseCase(repository);
    await repository.create(product);

    const input = {
      id: product.id,
      name: "Product Update",
      price: 10
    };
    const output = await usecase.execute(input);
    expect(output).toStrictEqual(input);
  });
});
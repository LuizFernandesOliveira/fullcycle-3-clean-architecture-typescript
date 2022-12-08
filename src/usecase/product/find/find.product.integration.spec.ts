import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Integration test find customer user case", () => {
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

  it("should find a customer", async () => {
    const product = ProductFactory.createBy("Note", 10);

    const repository = new ProductRepository();

    const usecase = new FindProductUseCase(repository);
    await repository.create(product);

    const input = { id: product.id };

    const output = await usecase.execute(input);

    expect(output).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });
});
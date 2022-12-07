import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test list product user case", () => {
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

  it("should list a product", async () => {
    const product = ProductFactory.create("Note", 10);

    const repository = new ProductRepository();

    const usecase = new ListProductUseCase(repository);
    await repository.create(product);

    const output = await usecase.execute();
    expect(output.products.length).toStrictEqual(1);
    expect(output.products[0].id).toStrictEqual(product.id);
    expect(output.products[0].name).toStrictEqual(product.name);
    expect(output.products[0].price).toStrictEqual(product.price);
  });
});
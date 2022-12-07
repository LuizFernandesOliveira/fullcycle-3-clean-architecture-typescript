import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: 'test',
  address: {
    street: 'test',
    number: 1,
    zipCode: 'test',
    city: 'test',
  },
}

describe("Integration test create customer user case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  it("should create a customer", async () => {
    const repository = new CustomerRepository();

    const usecase = new CreateCustomerUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zipCode: input.address.zipCode,
        city: input.address.city,
      }
    });
  });
});
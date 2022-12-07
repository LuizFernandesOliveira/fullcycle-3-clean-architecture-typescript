import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Address from "../../../domain/customer/valueobject/address";
import FindCustomerUseCase from "./find.customer.usecase";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";

describe("Integration test find customer user case", () => {
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

  it("should find a customer", async () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = CustomerFactory.createWithAddress("Customer 1", address);

    const repository = new CustomerRepository();

    const usecase = new FindCustomerUseCase(repository);
    await repository.create(customer);

    const input = { id: customer.id };
    const output = {
      id: customer.id,
      name: customer.name,
      address: {
        street: address.street,
        city: address.city,
        number: address.number,
        zipCode: address.zipCode,
      }
    }
    const result = await usecase.execute(input);
    expect(result).toStrictEqual(output);
  });
});
import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Address from "../../../domain/customer/valueobject/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

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

  it("should update a customer", async () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = CustomerFactory.createWithAddress("Customer 1", address);

    const customerRepository = new CustomerRepository();

    const usecase = new UpdateCustomerUseCase(customerRepository);
    await customerRepository.create(customer);

    const input = {
      id: customer.id,
      name: "Customer Update",
      address: {
        street: "Street Updated",
        city: "City Updated",
        number: 2,
        zipCode: "Zipcode Updated",
      }
    };
    const output = await usecase.execute(input);
    expect(output).toStrictEqual(input);
  });
});
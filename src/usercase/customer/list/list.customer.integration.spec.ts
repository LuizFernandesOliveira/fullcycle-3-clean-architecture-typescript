import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Address from "../../../domain/customer/valueobject/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Integration test list customer user case", () => {
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

  it("should list a customer", async () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = CustomerFactory.createWithAddress("Customer 1", address);

    const customerRepository = new CustomerRepository();

    const usecase = new ListCustomerUseCase(customerRepository);
    await customerRepository.create(customer);

    const output = await usecase.execute();
    expect(output.customers.length).toStrictEqual(1);
    expect(output.customers[0].id).toStrictEqual(customer.id);
    expect(output.customers[0].name).toStrictEqual(customer.name);
    expect(output.customers[0].address.street).toStrictEqual(customer.Address.street);
  });
});
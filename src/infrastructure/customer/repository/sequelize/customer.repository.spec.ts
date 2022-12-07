import {Sequelize} from "sequelize-typescript";
import CustomerModel from "./customer.model";
import Address from "../../../../domain/customer/valueobject/address";
import CustomerRepository from "./customer.repository";
import CustomerFactory from "../../../../domain/customer/factory/customer.factory";

describe("Customer repository test", () => {
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

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = CustomerFactory.createWithAddress("Customer 1", address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipCode: address.zipCode,
      city: address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = CustomerFactory.createWithAddress("Customer 1", address);
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipCode: address.zipCode,
      city: address.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer = CustomerFactory.createWithAddress("Customer 1", address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    await expect(async () => await customerRepository.find("456ABC")).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    const customer1 = CustomerFactory.createWithAddress("Customer 1", address1);
    customer1.addRewardPoints(10);
    customer1.activate();

    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    const customer2 = CustomerFactory.createWithAddress("Customer 2", address2);
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
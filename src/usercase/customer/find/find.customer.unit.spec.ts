import Address from "../../../domain/customer/valueobject/address";
import FindCustomerUseCase from "./find.customer.usecase";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";

const customer = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 1, "Zipcode 1", "City 1"));

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("unit test find customer user case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = { id: customer.id };
    const output = {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zipCode: customer.Address.zipCode,
      }
    }
    const result = await usecase.execute(input);
    expect(result).toStrictEqual(output);
  });

  it("should not found a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = { id: "123" };

    await expect(() => usecase.execute(input)).rejects.toThrow("Customer not found");
  });
});
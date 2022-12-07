import Address from "../../../domain/customer/valueobject/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 1, "Zipcode 1", "City 1"));

const input = {
  id: customer.id,
  name: 'test',
  address: {
    street: 'test',
    number: 1,
    zipCode: 'test',
    city: 'test',
  },
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerCreateUseCase = new UpdateCustomerUseCase(customerRepository);
    const output = await customerCreateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
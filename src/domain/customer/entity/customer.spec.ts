import Customer from "./customer";
import Address from "../valueobject/address";
import CustomerFactory from "../factory/customer.factory";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "Luiz Fernandes")).toThrowError("customer: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer("123", "")).toThrowError("customer: Name is required");
  });

  it("should throw error when id and name is empty", () => {
    expect(() => new Customer("", "")).toThrowError("customer: Id is required,customer: Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "Luiz");
    customer.changeName("Luiz Fernandes");
    expect(customer.name).toBe("Luiz Fernandes");
  });

  it("should activate customer", () => {
    const address = new Address("Rua 1", 10, "12345-678", "São Paulo");
    const customer = CustomerFactory.createWithAddress("Luiz Fernandes", address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined in customer", () => {
    const customer = new Customer("123", "Luiz");

    expect(() => customer.activate()).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "Luiz");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("123", "Luiz");
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
  });
});
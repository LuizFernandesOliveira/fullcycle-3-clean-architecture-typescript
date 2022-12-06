import CustomerFactory from "./customer.factory";
import Address from "../valueobject/address";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John");
    
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBeUndefined();
  });
  
  it("should create a customer with an address", () => {
    const address = new Address("Street", 1, "13330-250", "São Paulo");
    
    let customer = CustomerFactory.createWithAddress("John", address);
    
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBe(address);
  });
});
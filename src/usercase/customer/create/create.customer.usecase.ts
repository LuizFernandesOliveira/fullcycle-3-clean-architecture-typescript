import {InputCreateCustomerDto, OutputCreateCustomerDto} from "./create.customer.dto";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/valueobject/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CreateCustomerMapper from "./create.customer.mapper";

export default class CreateCustomerUseCase {
private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const address = new Address(input.address.street, input.address.number, input.address.zipCode, input.address.city)
    const customer = CustomerFactory.createWithAddress(input.name, address);
    await this.customerRepository.create(customer);
    return CreateCustomerMapper.toOutput(customer);
  }
}
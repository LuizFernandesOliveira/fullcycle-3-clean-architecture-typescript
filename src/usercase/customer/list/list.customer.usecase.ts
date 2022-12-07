import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {OutputListCustomerDto} from "./list.customer.dto";
import ListCustomerMapper from "./list.customer.mapper";

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll();
    return ListCustomerMapper.toOutput(customers);
  }
}
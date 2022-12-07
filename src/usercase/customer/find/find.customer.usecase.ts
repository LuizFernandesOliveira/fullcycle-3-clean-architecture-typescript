import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {InputFindCustomerDto, OutputFindCustomerDto} from "./find.customer.dto";
import FindCustomerMapper from "./find.customer.mapper";

export default class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id);
    return FindCustomerMapper.toOutput(customer);
  }
}
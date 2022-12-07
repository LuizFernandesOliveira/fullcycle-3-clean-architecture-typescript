import {OutputFindCustomerDto} from "./find.customer.dto";
import Customer from "../../../domain/customer/entity/customer";

export default class FindCustomerMapper {
  static toOutput(customer: Customer): OutputFindCustomerDto {
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zipCode: customer.Address.zipCode,
      }
    }
  }
}
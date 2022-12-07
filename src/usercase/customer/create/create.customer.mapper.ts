import Customer from "../../../domain/customer/entity/customer";
import {OutputCreateCustomerDto} from "./create.customer.dto";

export default class CreateCustomerMapper {
  static toOutput(customer: Customer): OutputCreateCustomerDto {
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
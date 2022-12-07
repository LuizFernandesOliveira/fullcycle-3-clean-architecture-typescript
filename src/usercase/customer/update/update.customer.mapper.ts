import {OutputUpdateCustomerDto} from "./update.customer.dto";
import Customer from "../../../domain/customer/entity/customer";

export default class UpdateCustomerMapper {
  static toOutput(customer: Customer): OutputUpdateCustomerDto {
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
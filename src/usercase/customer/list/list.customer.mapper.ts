import Customer from "../../../domain/customer/entity/customer";
import {OutputListCustomerDto} from "./list.customer.dto";

export default class ListCustomerMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDto {
    return {
      customers: customers.map((customer) => {
        return {
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.Address.street,
            number: customer.Address.number,
            zipCode: customer.Address.zipCode,
            city: customer.Address.city,
          }
        }
      })
    }
  }
}
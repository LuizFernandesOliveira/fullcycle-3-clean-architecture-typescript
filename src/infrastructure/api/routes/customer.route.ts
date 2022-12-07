import express from "express";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "../../../usercase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usercase/customer/list/list.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post("/", async (req, res) => {
  const input = req.body;
  const repository = new CustomerRepository();
  const useCase = new CreateCustomerUseCase(repository);
  try {
    const output = await useCase.execute(input);
    res.status(200).send(output);
  } catch (e) {
    res.status(500).send(e)
  }
});

customerRoute.get("/", async (req, res) => {
  const repository = new CustomerRepository();
  const useCase = new ListCustomerUseCase(repository);
  try {
    const output = await useCase.execute();
    res.status(200).send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});
import express from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usercase/product/list/list.product.usecase";
import CreateProductUseCase from "../../../usercase/product/create/create.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req, res) => {
  const input = req.body;
  const repository = new ProductRepository();
  const useCase = new CreateProductUseCase(repository);
  try {
    const output = await useCase.execute(input);
    res.status(200).send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});

productRoute.get("/", async (req, res) => {
  const repository = new ProductRepository();
  const useCase = new ListProductUseCase(repository);
  try {
    const output = await useCase.execute();
    res.status(200).send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});
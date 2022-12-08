import express, {Request, Response} from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const input = req.body;
  const useCase = new CreateProductUseCase(new ProductRepository());
  try {
    const output = await useCase.execute(input);
    res.status(200).send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository());
  try {
    const output = await useCase.execute();
    res.status(200).send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});
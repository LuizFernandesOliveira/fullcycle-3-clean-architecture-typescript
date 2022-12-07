import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const input = {
      name: "Note",
      price: 10
    }
    const response = await request(app)
      .post("/product")
      .send(input);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      ...input,
    });
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Note",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const input = {
      name: "Note",
      price: 10
    }
    const response = await request(app)
      .post("/product")
      .send(input);
    expect(response.status).toBe(200);

    const input2 = {
      name: "Table",
      price: 20,
    }
    const response2 = await request(app)
      .post("/product")
      .send(input2);
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product1 = listResponse.body.products[0];
    expect(product1).toEqual({
      id: expect.any(String),
      ...input,
    });
    const product2 = listResponse.body.products[1];
    expect(product2).toEqual({
      id: expect.any(String),
      ...input2,
    });
  });
});
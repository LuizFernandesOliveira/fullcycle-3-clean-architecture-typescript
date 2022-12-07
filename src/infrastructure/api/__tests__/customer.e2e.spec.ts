import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true});
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const input = {
      name: "John Doe",
      address: {
        street: "Street",
        city: "City",
        number: 10,
        zipCode: "12345-678",
      }
    }

    const response = await request(app)
      .post("/customer")
      .send(input);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      ...input
    });
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John Doe",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const input = {
      name: "John Doe",
      address: {
        street: "Street",
        city: "City",
        number: 10,
        zipCode: "12345-678",
      }
    }
    const response = await request(app)
      .post("/customer")
      .send(input);
    expect(response.status).toBe(200);

    const input2 = {
      name: "Jane Doe",
      address: {
        street: "Street",
        city: "City",
        number: 10,
        zipCode: "12345-678",
      }
    }
    const response2 = await request(app)
      .post("/customer")
      .send(input2);
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/customer").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    const customer1 = listResponse.body.customers[0];
    expect(customer1).toEqual({
      id: expect.any(String),
      ...input,
    });
    const customer2 = listResponse.body.customers[1];
    expect(customer2).toEqual({
      id: expect.any(String),
      ...input2,
    });
  });
});

import server from "../index.js";
import supertest from "supertest";

describe("Testes da aplicação", () => {
  test("O servidor deve estar rodando", async () => {
    const response = await supertest(server).get("/api/users");
    expect(response.statusCode).toBe(200);
  });
});
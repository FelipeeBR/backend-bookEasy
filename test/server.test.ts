import server from "../index.js";
import supertest from "supertest";

// Para test é module e servidor commonjs

describe("Testes da aplicação", () => {
  test("O servidor deve estar rodando", async () => {
    const response = await supertest(server).get("/api/users");
    expect(response.statusCode).toBe(200);
  });
});
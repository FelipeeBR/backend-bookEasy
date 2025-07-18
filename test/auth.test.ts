import server from "../index.js";
import supertest from "supertest";

describe("Testes de autenticação", () => {
    test("Deve gerar um erro ao tentar autenticar com campos vazios", async () => {
        const response = await supertest(server).post("/api/auth").send({
            email: "",
            password: ""
        });
        expect(response.statusCode).toEqual(400);
    });
});
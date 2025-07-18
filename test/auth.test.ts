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

    test("Deve gerar erro ao tentar autenticar com senha incorreta", async () => {
        const response = await supertest(server).post("/api/auth").send({
            email: "tDl9y@example.com",
            password: "12345"
        });
        expect(response.statusCode).toEqual(401);
    });

    test("Deve gerar erro ao tentar autenticar com e-mail incorreto", async () => {
        const response = await supertest(server).post("/api/auth").send({
            email: "fulano",
            password: "1234567898"
        });
        expect(response.statusCode).toEqual(401);
    });
});
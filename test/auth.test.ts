import server from "../index.js";
import supertest from "supertest";

let userTest = {
    email: "tDl9y@example.com",
    password: "1234567898",
    name: "Fulano",
    phone: "11999999999",
    type: "ADMIN"
}

beforeAll(async () => {
    await supertest(server).post("/api/register").send(userTest);
});

afterAll(async () => {
    await supertest(server).delete(`/api/users/${userTest.email}`);    
});

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
            email: userTest.email,
            password: "12345"
        });
        expect(response.statusCode).toEqual(401);
    });

    test("Deve gerar erro ao tentar autenticar com e-mail incorreto", async () => {
        const response = await supertest(server).post("/api/auth").send({
            email: "fulano@email.com",
            password: userTest.password
        });
        expect(response.statusCode).toEqual(401);
    });

    test("Deve autenticar usuario com sucesso", async () => {
        const response = await supertest(server).post("/api/auth").send({
            email: userTest.email,
            password: userTest.password
        });
        expect(response.statusCode).toEqual(200);
    });
});
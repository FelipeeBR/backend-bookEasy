import server from "../index.js";
import supertest from "supertest";

describe("Testes de usuarios", () => {
    test("Deve criar um novo usuário", async () => {
        const time = Date.now();
        const email = `${time}@email.com`;
        const response = await supertest(server).post("/api/register").send({
            name: "Fulano",
            email: email,
            password: "1234567898",
            phone: "11999999999",
            type: "ADMIN"
        });
        expect(response.statusCode).toEqual(201);  
    });
});
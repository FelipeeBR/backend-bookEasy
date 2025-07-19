import server from "../index.js";
import supertest from "supertest";

let userTest = {
    email: "tDl9y@example.com",
    password: "1234567898",
    name: "Fulano",
    phone: "11999999999",
    type: "CLIENT"
}

let userId = 0;

beforeAll(async () => {
    await supertest(server).post("/api/register").send(userTest);
    const response = await supertest(server).get(`/api/users/${userTest.email}`);
    userId = response.body?.user.id;
});

afterAll(async () => {
    await supertest(server).delete(`/api/users/${userTest.email}`);    
});

describe("Testes de clientes", () => {
    test("Deve criar um novo cliente", async () => {
        const response = await supertest(server).post("/api/customer/create").send({
            cpf: "123456789",
            dataNasc: new Date('2000-01-01'),
            endereco: "Rua 1, 123, Cidade",
            userId: userId
        });
        expect(response.statusCode).toEqual(201);
    });
});
import server from "../index.js";
import supertest from "supertest";

let userTest = {
    email: "tDl9y@example.com",
    password: "1234567898",
    name: "Fulano",
    phone: "11999999999",
    type: "EMPLOYEE"
}

let userId = 0;

beforeAll(async () => {
    await supertest(server).post("/api/register").send(userTest);
    const response = await supertest(server).get(`/api/users/${userTest.email}`);
    console.log(response.body);
    userId = response.body?.user.id;
});

afterAll(async () => {
    await supertest(server).delete(`/api/users/${userTest.email}`);    
});

describe("Testes de funcionários", () => {
    test("Deve criar um novo funcionário", async () => {
        const response = await supertest(server).post("/api/employee").send({
            specialization: "Mecanico",
            userId: userId
        });
        console.log(response.body);
        expect(response.statusCode).toEqual(201);
    });

    test("Deve criar um novo funcionário com dados inválidos", async () => {
        const response = await supertest(server).post("/api/employee/create").send({
            specialization: "",
            userId: userId
        });
        expect(response.statusCode).toEqual(400);
    });
});

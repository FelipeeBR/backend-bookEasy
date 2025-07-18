import server from "../index.js";
import supertest from "supertest";

describe("Testes de usuarios", () => {
    // Usando emails aleatórios
    /*test("Deve criar um novo usuário", async () => {
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
    });*/

    // Usando email para outros testes
    test("Deve criar um novo usuário", async () => {

        const response = await supertest(server).post("/api/register").send({
            name: "Fulano",
            email: "tDl9y@example.com",
            password: "1234567898",
            phone: "11999999999",
            type: "ADMIN"
        });
        expect(response.statusCode).toEqual(201);  
    });

    test("Deve não cadastrar usuario com dados inválidos", async () => {
        const response = await supertest(server).post("/api/register").send({
            name: "",
            email: "",
            password: "",
            phone: "",
            type: ""
        });
        expect(response.statusCode).toEqual(400);
    });
});
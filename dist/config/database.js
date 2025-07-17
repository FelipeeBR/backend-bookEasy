const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
export default prisma;
prisma.$connect()
    .then(() => console.log("Banco de dados conectado com sucesso"))
    .catch((err) => {
    console.log("Erro ao conectar ao banco de dados: ", err);
    process.exit(1);
});
//# sourceMappingURL=database.js.map
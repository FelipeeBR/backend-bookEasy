import express from "express";
const router = express.Router();
import customerController from "../controllers/customerController";

router.post("/customer", async (req: any, res: any) => {
    const { cpf, dataNasc, endereco, userId } = req.body;
    if(!cpf || !dataNasc || !endereco || !userId) return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    try {
        const customer = await customerController.createCustomer(cpf, dataNasc, endereco, userId);
        return res.status(201).json({ message: "Cliente criado com sucesso!", "customer": customer });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar cliente!" });
    }
});

export default router;
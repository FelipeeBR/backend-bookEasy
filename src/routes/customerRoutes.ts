import express from "express";
const router = express.Router();
import customerController from "../controllers/customerController";
import { auth, AuthenticatedRequest } from "../middlewares/auth";

router.post("/customer", auth, async (req: AuthenticatedRequest, res: any) => {
    const userId = req.user?.id;
    const { cpf, dataNasc, endereco } = req.body;
    if(!cpf || !dataNasc || !endereco || !userId) return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    try {
        const customer = await customerController.createCustomer(cpf, dataNasc, endereco, userId);
        return res.status(201).json({ message: "Cliente criado com sucesso!", "customer": customer });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar cliente!" });
    }
});

router.get("/customers", auth, async (req: any, res: any) => {
    try {
        const customers = await customerController.getCustomers();
        return res.status(200).json({ customers: customers });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar clientes!" });
    }
});

router.get("/customer/:id", auth, async (req: any, res: any) => {
    const {id} = req.params;
    if(!id) return res.status(401).json({ error: "Id inválido!" });
    try {
        const customer = await customerController.getCustomer(parseInt(id));
        return res.status(200).json({ customer: customer });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar cliente!" });
    }
});

router.get("/customer", auth, async (req: AuthenticatedRequest, res: any) => {
    const userId = req.user?.id;
    if(!userId) return res.status(401).json({ error: "Id inválido!" });
    try {
        const customer = await customerController.getCustomerByUserId(userId);
        return res.status(200).json({ customer: customer });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar cliente!" });
    }
});

export default router;
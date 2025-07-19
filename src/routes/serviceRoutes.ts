import express from "express";
const router = express.Router();

import serviceController from "../controllers/serviceController";


router.post("/service", async (req: any, res: any) => {
    const { name, duration, price, description, employeeId } = req.body;
    if(!name || !duration || !price || !description || !employeeId) return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    try {
        const service = await serviceController.createService(name, duration, price, description, employeeId);
        return res.status(201).json({ message: "Servico criado com sucesso!", "service": service });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar servico!" });
    }
});

export default router;
import express from "express";
const router = express.Router();

import schedulingController from "../controllers/schedulingController";

router.post("/scheduling", async (req: any, res: any) => {
    const { serviceId, status, timeId, customerId } = req.body;
    if(!serviceId || !timeId || !customerId) return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    try {
        const scheduling = await schedulingController.createScheduling(serviceId, status, timeId, customerId);
        return res.status(201).json({ message: "Agendamento criado com sucesso!", "scheduling": scheduling });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar agendamento!" });
    }
});

export default router;
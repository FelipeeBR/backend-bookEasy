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

router.post("/service/time", async (req: any, res: any) => {
    const { startTime, serviceId } = req.body;
    if(!startTime || !serviceId) return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    try {
        const service = await serviceController.createServiceTime(startTime, serviceId);
        return res.status(201).json({ message: "Servico criado com sucesso!", "service": service });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar servico!" });
    }
});

router.get("/service/:id", async (req: any, res: any) => {
    const {id} = req.params;
    if(!id) return res.status(401).json({ error: "Id inválido!" });
    try {
        const service = await serviceController.getService(parseInt(id));
        return res.status(200).json({ service: service });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar servico!" });
    }
});

export default router;
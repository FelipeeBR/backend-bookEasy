import express from "express";
const router = express.Router();

import serviceController from "../controllers/serviceController";
import employeeController from "../controllers/employeeController";
import { auth, AuthenticatedRequest } from "../middlewares/auth";

router.post("/service", auth, async (req: AuthenticatedRequest, res: any) => {
    const userId = req.user?.id;
    const { name, duration, price, description } = req.body;
    if (!userId) {
        return res.status(401).json({ error: "User Id inválido!" });
    }
    if(!name || !duration || !price || !description) return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    try {
        const employeeId = await employeeController.getEmployeeIdByUserId(userId);
        const service = await serviceController.createService(name, duration, price, description, employeeId);
        return res.status(201).json({ message: "Servico criado com sucesso!", "service": service });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar servico!" });
    }
});

router.post("/service/time", auth, async (req: any, res: any) => {
    const { startTime, serviceId } = req.body;
    if(!startTime || !serviceId) return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    try {
        const service = await serviceController.createServiceTime(startTime, serviceId);
        return res.status(201).json({ message: "Servico criado com sucesso!", "service": service });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar servico!" });
    }
});

router.get("/service/:id", auth, async (req: any, res: any) => {
    const {id} = req.params;
    if(!id) return res.status(401).json({ error: "Id inválido!" });
    try {
        const service = await serviceController.getService(parseInt(id));
        return res.status(200).json({ service: service });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar servico!" });
    }
});

router.get("/services", auth, async (req: any, res: any) => {
    try {
        const services = await serviceController.getServices();
        return res.status(200).json({ services: services });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar servicos!" });
    }
});

export default router;
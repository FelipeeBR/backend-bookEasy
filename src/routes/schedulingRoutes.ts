import express from "express";
const router = express.Router();

import schedulingController from "../controllers/schedulingController";
import customerController from "../controllers/customerController";
import { auth, AuthenticatedRequest} from "../middlewares/auth";

router.post("/scheduling", auth, async (req: any, res: any) => {
    const { serviceId, status, timeId, customerId } = req.body;
    console.log(req.body);
    if(!serviceId || !timeId || !customerId) return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    try {
        const scheduling = await schedulingController.createScheduling(serviceId, status, timeId, customerId);
        return res.status(201).json({ message: "Agendamento criado com sucesso!", "scheduling": scheduling });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar agendamento!" });
    }
});

router.delete("/scheduling/:id", auth, async (req: any, res: any) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({ error: "Id inválido!" });
    try {
        await schedulingController.deleteScheduling(parseInt(id));
        return res.status(200).json({ message: "Agendamento excluido com sucesso!" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao excluir agendamento!" });
    }
});

// Listar agendamentos do costumer / do usuario logado
router.get("/scheduling", auth, async (req: AuthenticatedRequest, res: any) => {
    const userId = req.user?.id;
    if(!userId) return res.status(400).json({ error: "Id inválido!" });
    try {
        const costumerId = await customerController.getCustomerIdByUserId(userId);
        const scheduling = await schedulingController.getScheduling(costumerId);
        return res.status(200).json({ scheduling: scheduling });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar agendamento!" });
    }
});
export default router;
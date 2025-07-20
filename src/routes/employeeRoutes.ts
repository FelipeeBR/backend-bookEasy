import express from "express";
const router = express.Router();

import employeeController from "../controllers/employeeController";
import { auth } from "../middlewares/auth";

router.post("/employee", auth, async (req: any, res: any) => {
    const { specialization, userId } = req.body;
    if(!specialization || !userId) return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    try {
        const employee = await employeeController.createEmployee(specialization, userId);
        return res.status(201).json({ message: "Funcionario criado com sucesso!", "employee": employee });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar funcionário!" });
    }
});

export default router;
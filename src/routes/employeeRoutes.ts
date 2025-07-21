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

router.get("/employee/:id", auth, async (req: any, res: any) => {
    const {id} = req.params;
    if(!id) return res.status(401).json({ error: "Id inválido!" });
    try {
        const employee = await employeeController.getEmployee(parseInt(id));
        return res.status(200).json({ employee: employee });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar funcionário!" });
    }
});

router.get("/employees", auth, async (req: any, res: any) => {
    try {
        const employees = await employeeController.getEmployees();
        return res.status(200).json({ employees: employees });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar funcionários!" });
    }
});

router.patch("/employee/:id", auth, async (req: any, res: any) => {
    const { id } = req.params;
    const { specialization } = req.body;
    if(!id || !specialization) return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    try {
        const employee = await employeeController.updateEmployee(parseInt(id), specialization);
        return res.status(200).json({ message: "Funcionario atualizado com sucesso!", "employee": employee });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao atualizar funcionário!" });
    }
});

router.delete("/employee/:id", auth, async (req: any, res: any) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({ error: "Id inválido!" });
    try {
        await employeeController.deleteEmployee(parseInt(id));
        return res.status(200).json({ message: "Funcionario excluido com sucesso!" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao excluir funcionário!" });
    }
});

export default router;
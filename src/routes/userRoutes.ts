import express from "express";
const router = express.Router();
import userController from "../controllers/userController";
import { auth } from "../middlewares/auth";

router.post("/register", async (req: any, res: any) => {
    const { name, email, password, phone, type } = req.body;
    if(!name || !email || !password || !type) return res.status(400).json({error: "Todos os campos devem ser preenchidos!"});
    if(!userController.isValidPassword(password)) return res.status(400).json({error: "A senha deve ter no mínimo 8 caracteres!"});
    if(!userController.isValidEmail(email)) return res.status(400).json({error: "E-mail inválido!"});
    if(await userController.userExists(email)) return res.status(400).json({error: "Alguém já possui uma conta com este e-mail."});

    try {
        const user = await userController.createUser(name, email, password, phone, type);
        return res.status(201).json({message: "Usuário criado com sucesso!", "user": user});
    } catch (error) {
        return res.status(500).json({error: "Erro ao criar usuário!"});
    }
});

router.delete("/users/:email", auth, async (req: any, res: any) => {
    const { email } = req.params;
    if(!email) return res.status(400).json({error: "E-mail inválido!"});
    try {
        await userController.deleteUser(email);
        return res.status(200).json({message: "Usuário excluido com sucesso!"});
    } catch (error) {
        return res.status(500).json({error: "Erro ao excluir usuário!"});
    }
});

router.get("/users/:email", auth, async (req: any, res: any) => {
    const { email } = req.params;
    if(!email) return res.status(400).json({error: "E-mail inválido!"});
    try {
        const user = await userController.getUser(email);
        return res.status(200).json({user: user});
    } catch (error) {
        return res.status(500).json({error: "Erro ao buscar usuário!"});
    }
})

router.get("/users", auth, async (req: any, res: any) => {
    try {
        const users = await userController.getUsers();
        return res.status(200).json({users: users});
    } catch (error) {
        return res.status(500).json({error: "Erro ao buscar usuários!"});
    }
});

export default router;
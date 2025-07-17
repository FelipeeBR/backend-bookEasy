import express from "express";
const router = express.Router();
import userController from "../controllers/userController";
router.post("/register", async (req, res) => {
    const { name, email, password, phone, type } = req.body;
    if (!name || !email || !password || !type)
        return res.status(400).json({ "error": "Todos os campos devem ser preenchidos!" });
    if (userController.isValidPassword(password))
        return res.status(400).json({ "error": "A senha deve ter no mínimo 8 caracteres!" });
    if (!userController.isValidEmail(email))
        return res.status(400).json({ "error": "E-mail inválido!" });
    if (await userController.userExists(email))
        return res.status(400).json({ "error": "Alguém já possui uma conta com este e-mail." });
    try {
        const user = await userController.createUser(name, email, password, phone, type);
        return res.status(201).json({ "message": "Usuário criado com sucesso!", "user": user });
    }
    catch (error) {
        return res.status(500).json({ "error": "Erro ao criar usuário!" });
    }
});
router.get("/users", async (req, res) => {
    res.send("Listagem de usuários");
});
export default router;
//# sourceMappingURL=userRoutes.js.map
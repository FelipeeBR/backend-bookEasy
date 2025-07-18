import express, { Request, Response } from "express";

const router = express.Router();
import authController from "../controllers/authController";

router.post("/auth", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    const token = await authController.authenticate(email, password);
    if(!token) return res.status(401).json({ error: "E-mail ou senha incorretos!" });
    return res.status(200).json({ token: token });
});

router.post("/auth/refresh", async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if(!refreshToken) return res.status(400).json({ error: "No token" });
    const token = await authController.refresh(refreshToken);
    if(!token) return res.status(403).json({ error: "Token inválido!" });
    return res.status(200).json({ token: token });
});

router.post("/auth/logout", async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const token = await authController.logout(refreshToken);
    if(!token) return res.status(403).json({ error: "Token inválido!" });
    return res.status(200).json({ message: "Logout realizado com sucesso!" });
});

export default router;


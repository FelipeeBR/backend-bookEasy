import express from "express";
const router = express.Router();
const { authenticate, refresh, logout } = require("../controllers/authController");
router.post("/auth", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    const token = await authenticate(email, password);
    if (!token)
        return res.status(401).json({ error: "E-mail ou senha incorretos!" });
    return res.status(200).json({ token: token });
});
router.post("/auth/refresh", async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.status(400).json({ error: "No token" });
    const token = await refresh(refreshToken);
    if (!token)
        return res.status(403).json({ error: "Token inválido!" });
    return res.status(200).json({ token: token });
});
router.post("/auth/logout", async (req, res) => {
    const { refreshToken } = req.body;
    const token = await logout(refreshToken);
    if (!token)
        return res.status(403).json({ error: "Token inválido!" });
    return res.status(200).json({ message: "Logout realizado com sucesso!" });
});
export default router;
//# sourceMappingURL=authRoutes.js.map
import express, { Request, Response} from 'express';

const router = express.Router();
const { authenticate } = require("../controllers/authController");

router.post("/auth", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({"error": "Todos os campos devem ser preenchidos!"});
    const token = await authenticate(email, password);
    if(!token) return res.status(401).json({"error": "E-mail ou senha incorretos!"});
    return res.status(200).json({"token": token});
});

module.exports = router;


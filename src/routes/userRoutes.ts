const expressInstance = require("express");
const router = expressInstance.Router();
const userController = require("../controllers/userController");

router.post("/register", async (req: any, res: any) => {
    const { name, email, password, phone, type } = req.body;
    if(!name || !email || !password || !type) return res.status(400).json({"message": "Todos os campos devem ser preenchidos!"});

    try {
        const user = await userController.createUser(name, email, password, phone, type);
        return res.status(201).json({"message": "Usuário criado com sucesso!", "user": user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({"message": "Erro ao criar usuário!"});
    }
});

router.get("/users", async (req: any, res: any) => {
    res.send("Listagem de usuários");
})

module.exports = router;
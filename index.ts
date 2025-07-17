import express from "express";
import bodyParser from "body-parser";

//Rotas
import userRoutes from "./src/routes/userRoutes";
import authRoutes from "./src/routes/authRoutes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.listen(4000, () => {
    console.log("Servidor está funcionado na porta 4000");
});

export default app;
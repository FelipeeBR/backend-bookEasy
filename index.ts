import express from "express";
import bodyParser from "body-parser";

//Rotas
import userRoutes from "./src/routes/userRoutes";
import authRoutes from "./src/routes/authRoutes";
import customerRoutes from "./src/routes/customerRoutes";
import employeeRoutes from "./src/routes/employeeRoutes";
import serviceRoutes from "./src/routes/serviceRoutes";
import schedulingRoutes from "./src/routes/schedulingRoutes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", customerRoutes);
app.use("/api", employeeRoutes);
app.use("/api", serviceRoutes);
app.use("/api", schedulingRoutes);

app.listen(4000, () => {
    console.log("Servidor Funcionando!");
});

export default app;
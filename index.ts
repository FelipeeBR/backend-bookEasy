const express = require("express");
const bodyParser = require("body-parser");

//Rotas
const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", userRoutes);

app.listen(4000, () => {
    console.log("Servidor está funcionado na porta 4000");
});
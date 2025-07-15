"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", userRoutes);
app.listen(3000, () => {
    console.log("Servidor está funcionado na porta 3000");
});
//# sourceMappingURL=index.js.map
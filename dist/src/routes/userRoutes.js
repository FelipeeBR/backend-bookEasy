"use strict";
const expressInstance = require("express");
const router = expressInstance.Router();
router.get("/", (req, res) => {
    res.send("User Route");
});
module.exports = router;
//# sourceMappingURL=userRoutes.js.map
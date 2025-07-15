const expressInstance = require("express");
const router = expressInstance.Router();

router.get("/", (req: any, res: any) => {
    res.send("User Route");
});

module.exports = router;
const express = require("express")
const router = express.Router();
const logger = require("../utils/logger")


router.get("/", (req, res, next) => {

    res.json({ vacations: ["v1", "v2"] })
})

router.post("/", (req, res, next) => {
    res.json({ message: "flight saved" })
})



module.exports = router;
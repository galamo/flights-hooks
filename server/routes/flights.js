const express = require("express")
const router = express.Router();
const logger = require("../utils/logger")
const Joi = require("@hapi/joi");
const flightValidation = require("../validations/flightsValidations")
const flightsData = require("../data/flights.json")
const jwt = require("jsonwebtoken");

// router.use((req, res, next) => {
//     const { authorization } = req.headers
//     jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
//         if (err) return res.status(401).send("verification failed")
//         console.log(decoded)    
//         next();
//     })
// })
router.get("/", (req, res, next) => {
    const { flights } = flightsData;
    res.json({ flights })
})

// router.use(flightValidation)
router.post("/", (req, res, next) => {
    res.json({ message: "flight saved " })
})

router.put("/", (req, res, next) => {
    const { ddlValue } = req.body

    res.json({ message: "flight edited" })
})





module.exports = router;
const express = require("express")
const Joi = require("@hapi/joi");
const flightSchema =
    Joi.object({
        flightId: Joi.string().min(5).max(15).required(),// "123412",
        from: Joi.string().required(),
        destination: Joi.string().required(),
        departure: Joi.date(),
        arrival: Joi.date()
    })
const flightsSchema = Joi.object({
    flights: Joi.array().items(flightSchema)
})

function flightValidation(req, res, next) {
    const { error } = flightsSchema.validate(req.body);
    if (error) return res.json({ error })
    next();
}


module.exports = flightValidation;
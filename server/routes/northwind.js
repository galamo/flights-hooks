const express = require("express")
const router = express.Router();
const db = require("../db")
const pool = require("../db/pool")

router.get("/", (req, res, next) => {
    const { CompanyName, job } = req.query
    const [query, params] = getCustomersQuery(req.query)
    console.log(query, params)
    db.execute(query, params, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

router.get("/cities", (req, res, next) => {
    const { shippingFee } = req.query
    const [query, params] = getCitiesQuery(req.query)
    console.log(query, params)
    db.execute(query, params, (err, result) => {
        if (err) return res.json(err)
        return res.json(result.map(c => c.ship_city))
    })
})

router.get("/citiesAsync", async (req, res, next) => {
    const [query, params] = getCitiesQuery(req.query)
    const result = await pool.execute(query, params);
    const [first] = result;
    console.log(first)
    res.json(first.map(row => row.ship_city))
})

function getCustomersQuery(params) {
    return [`select * from customers where Company = ? and job_title = ?`, [...Object.values(params)]]
}
function getCitiesQuery(params) {
    return [`select distinct(ship_city) from orders where shipping_fee >= ?`, [...Object.values(params)]]
}



module.exports = router;
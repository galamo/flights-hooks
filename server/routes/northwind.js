const express = require("express")
const router = express.Router();
const db = require("../db")

router.get("/", (req, res, next) => {
    const { CompanyName, job } = req.query
    const [query, params] = getCustomersQuery(req.query)
    console.log(query, params)
    db.execute(query, params, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

function getCustomersQuery(params) {
    return [`select * from customers where Company = ? and job_title = ?`, [...Object.values(params)]]
}



module.exports = router;
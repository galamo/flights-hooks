const express = require("express")
const router = express.Router();
const db = require("../db")

router.get("/", (req, res, next) => {
    const { CompanyName, job } = req.query

    db.execute(getCustomersQuery(), [CompanyName, job], (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

function getCustomersQuery() {
    return `select * from customers where Company = ? and job_title = ?`
}



module.exports = router;
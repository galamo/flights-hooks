const express = require("express")
const router = express.Router();
const sessions = require("../sessions/sessions");
const usersData = require("../data/users.json");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool")
const bcrypt = require('bcryptjs'); // npm install
// const salt = 1
const salt = "$2a$08$rqcFcjwJ2cmaXxHsGBz3Hu"

// console.log("salt", salt)
// console.log("salt2", salt2)
// console.log(bcrypt.hashSync("password", salt))
// console.log(bcrypt.hashSync("password", salt2))

console.log("salt is validated:", bcrypt.hashSync("password", salt))


router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const user = await isUserExist(email, password);
        console.log(user)
        if (!user) return res.status(401).send("ERROR LOGIN") // change to general error
        const jwtToken = await getJwt({ ...user, password: null })
        return res.json({ message: "redirect", token: jwtToken })
    } catch (ex) {
        console.log(ex)
        if (!user) return res.status(401).send("ERROR LOGIN")
    }

})


router.post("/register", async (req, res, next) => {
    const { email, password } = req.body
    const user = await isUserExist(email);
    if (user) return res.json({ message: "user already exist" })

    const insertId = await saveUser(req.body)
    if (insertId) return res.json({ message: "user saved!" })
    return res.json({ message: "error!" })

})


router.get("/verify", async (req, res, next) => {
    try {
        setTimeout(() => {
            const { authorization } = req.headers
            jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
                if (err) return res.json({ status: false })
                console.log(decoded)
                return res.json({ status: true })
            })
        }, 2000);
    } catch (ex) {

        return res.json({ status: false })
    }

})

module.exports = router;



function getJwt(p) {
    return new Promise((resolve, reject) => {
        jwt.sign(p, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) reject("error")
            resolve(token)
        })
    })
}



async function isUserExist(email, password = null) {
    const payload = password ? [email, bcrypt.hashSync(password, salt)] : [email]
    // const payload = password ? [email, password] : [email]

    const query = password ? getUserPasswordExistQuery() : getUserExistQuery()
    const [result] = await pool.execute(query, payload)
    const [firstUser] = result;
    return firstUser;
}


async function saveUser(payload) {
    const { email, password, firstName = null, lastName = null } = payload
    const [result] = await pool.execute(getUserInsertionQuery(), [email, bcrypt.hashSync(password, salt), firstName, lastName])
    // const [result] = await pool.execute(getUserInsertionQuery(), [email, password, firstName, lastName])

    return result.insertId
}

function getUserExistQuery() {
    return "SELECT * FROM `northwind`.`users` where email = ?";
}

function getUserPasswordExistQuery() {
    return "SELECT * FROM `northwind`.`users` where email = ? and password = ?";
}
function getUserInsertionQuery() {
    return "INSERT INTO `northwind`.`users` (`email`, `password`, `first_name`, `last_name`) VALUES (?,?,?,?)"

}
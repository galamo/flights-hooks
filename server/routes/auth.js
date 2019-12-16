const express = require("express")
const router = express.Router();
const sessions = require("../sessions/sessions");
const usersData = require("../data/users.json");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool")
const bcrypt = require('bcryptjs'); // npm install
const salt = bcrypt.genSaltSync(10);
// const salt2 = bcrypt.genSaltSync(8);
// console.log("salt", salt)
// console.log("salt2", salt2)
// console.log(bcrypt.hashSync("password", salt))
// console.log(bcrypt.hashSync("password", salt2))

console.log(bcrypt.hashSync("password", salt))


router.post("/login", async (req, res, next) => {
    try {
        const { users } = usersData;
        const { email, password } = req.body
        const user = await isUserExist(email, password);
        if (!user) return res.status(401).send("ERROR LOGIN") // change to general error
        const jwtToken = await getJwt({ ...user, password: null })
        return res.json({ message: "user logged in", token: jwtToken })
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
    const query = password ? getUserPasswordExistQuery() : getUserExistQuery()
    const [result] = await pool.execute(query, payload)
    const [firstUser] = result;
    return firstUser;
}


async function saveUser(payload) {
    const { email, password, firstName = null, lastName = null } = payload
    const [result] = await pool.execute(getUserInsertionQuery(), [email, bcrypt.hashSync(password, salt), firstName, lastName])
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
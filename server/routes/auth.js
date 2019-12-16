const express = require("express")
const router = express.Router();
const sessions = require("../sessions/sessions");
const usersData = require("../data/users.json");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool")

router.post("/login", (req, res, next) => {
    const { users } = usersData;
    const { email, password } = req.body
    // const userExist = users.find(user => user.email === email && user.password === password);
    // if (!userExist) return res.status(401).send("error")
    // //GENERATE SESSION
    // const token = jwt.sign({
    //     userExist
    // }, process.env.SECRET, { expiresIn: '1h' });
    // console.log(token)
    res.json({ message: "user logged in", token })
})

router.post("/register", async (req, res, next) => {
    const { users } = usersData;

    //hash password
    const user = await isUserExist();
    if (user) return res.json({ message: "user already exist" })
    const result = await saveUser(req.body)
    res.json(result)
})



module.exports = router;

async function isUserExist(email) {
    const [user] = await pool.execute("select * from users where email = ?", [email])
    return user;
}

async function saveUser(payload) {
    const { email, password, firstName = null, lastName = null } = payload
    return await pool.execute(getUserInsertionQuery(), [email, password, firstName, lastName])
}
function getUserInsertionQuery() {
    return "INSERT INTO `northwind`.`users` (`email`, `password`, `first_name`, `last_name`) VALUES (?,?,?,?)"

}
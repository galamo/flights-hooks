const express = require("express")
const router = express.Router();
const sessions = require("../sessions/sessions");
const usersData = require("../data/users.json");
const fs = require("fs");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
    const { users } = usersData;
    const { email, password } = req.body
    const userExist = users.find(user => user.email === email && user.password === password);
    if (!userExist) return res.status(401).send("error")
    //GENERATE SESSION
    const token = jwt.sign({
        userExist
    }, process.env.SECRET, { expiresIn: '1h' });
    console.log(token)
    res.json({ message: "user logged in", token })

})

router.post("/register", (req, res, next) => {
    const { users } = usersData;
    const { email, password } = req.body
    //ANOTHER VALIDATION (email already exist, bad request , conflict 409 )
    fs.writeFile("./data/users.json",
        JSON.stringify({ users: [...users, { email, password }] }), (err) => {
            if (err) console.log(err);
        })
    res.json({ message: "registration completed", redirect: true })
})



module.exports = router;
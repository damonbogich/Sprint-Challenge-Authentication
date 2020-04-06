const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../jokes/jokes-model.js");
const { jwtSecret } = require("../config/secrets.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // get a token

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token // send the token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.status(500).json({ error: "/login error" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
    //   role: user.role,  I think role is not needed
  };

  //   const secret = "is it secret? is it safe?"  coming from secrets file now

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;

import express from "express";
import pool from "../dbConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//create one user
router.post("/all", async (req, res) => {
  try {
    //console.log(req.body);
    const { email, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (email, password) VALUES($1, $2) RETURNING *",
      [email, password]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//GET ALL USERS
router.get("/all", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    //console.log(response);
    //console.log(response.rows);
    res.json(allUsers.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get one user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);

    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//update one user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nickname } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET nickname = $1 WHERE user_id = $2",
      [nickname, id]
    );

    res.json("User Nickname is updatet.");
  } catch (error) {
    console.log(error.message);
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [id]
    );
    res.json("User was deleted.");
  } catch (error) {
    console.log(error.message);
  }
});

// ----------------------------------------------------------------------------------------------------------------

router.post("/all/signup", async (req, res) => {
  console.log('req.body', req.body)
  const { email, password } = req.body;
  try {
    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [email]); //Checking if email already exists
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
        success: false
      });
    }
    else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Error encrypting pwd",
            success: false
          });
        const user = {
          email,
          password: hash,
        };

        //Inserting data into the database

        pool
          .query(`INSERT INTO users (email, password) VALUES ($1,$2);`, [user.email, user.password], (err) => {

            if (err) {
              console.error(err);
              return res.status(500).json({
                error: "Database error",
                success: false
              })
            }
            else {
              const token = jwt.sign( //Signing a jwt token
                {
                  email: user.email
                },
                process.env.SECRET_KEY
              );
              res.status(200).send({
                success: true,
                email: user.email,
                jwt: token,
              });
            }
          })
      });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registering user!", //Database connection error
      success: false,

    });
  };
});

// ---------------------------------------------------------------------------------------------------------------------

/* router.get("/me", auth, async (req, res) => {
console.log('req.user', req.user)
}) */

router.post("/all/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [email]) //Verifying if the user exists in the database
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        error: "User is not registered, Sign Up first",
        success: false,
      });
    }
    else {
      console.log('user', user);
      bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else if (result === true) { //Checking if credentials match
          const token = jwt.sign(
            {
              email: email,
              /* id: user[0].user_id,
              Alles was hier drin steht, kann dann auf jwt.io gedebuggt werden und ist für jeden ersichtlich.
              Mit nur der mail hier sieht man nur die email im debug und den iat key.
              iat steht für "issue at" und ist das datum, wann der token erstellt wurde.
              */
            },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            success: true,
            useremail: user[0].email,
            usernickname: user[0].nickname,
            userpicture: user[0].picture,
            usertext: user[0].profiletext,
            userid: user[0].user_id,
            loggedUser: user[0],
            token: token, //const token is declared here in code before
          });
        }
        else {
          //Declaring the errors
          if (result != true)
            res.status(400).json({
              error: "Enter correct password!",
              success: false,

            });
        }
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
      success: false,

    });
  };
});


export default router;
import express from "express";
import pool from "../dbConfig.js";

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

//get all users
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

export default router;

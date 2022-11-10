import express from "express";
import pool from "../dbConfig.js";

const router = express.Router();

//GET route to query users table using raw SQL and node
router.get("/all", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM testtable");
    //console.log(response);
    console.log(response.rows);
    res.json(response.rows);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;

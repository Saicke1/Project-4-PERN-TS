import express from "express";
import pool from "../dbConfig.js";

const router = express.Router();

//get all comments
router.get("/all", async (req, res) => {
    try {
      const allComments = await pool.query("SELECT * FROM comments");
      //console.log(response);
      //console.log(response.rows);
      res.json(allComments.rows);
    } catch (error) {
      console.log(error.message);
    }
  });

//get one comment
router.get("/:commentid", async (req, res) => {
    try {
      const { commentid } = req.params;
      const comment = await pool.query("SELECT * FROM comments WHERE comment_id = $1", [
        commentid,
      ]);
  
      res.json(comment.rows[0]);
    } catch (error) {
      console.log(error.message);
    }
  });

  //get comments for one hotel ID
  router.get("/hotelcomments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const comments = await pool.query("SELECT * FROM comments WHERE hotel_id = $1", [
        id,
      ]);
  
      res.json(comments.rows);
    } catch (error) {
      console.log(error.message);
    }
  });

//create comment
router.post("/create", async (req, res) => {
    try {
      //console.log(req.body);
      const { comment_text, rating, user_id, hotel_id } = req.body;
      const newComment = await pool.query(
        "INSERT INTO comments (comment_text, rating, user_id, hotel_id) VALUES($1, $2, $3, $4) RETURNING *",
        [comment_text, rating, user_id, hotel_id]
      );
      res.json(newComment.rows[0]);
    } catch (error) {
      console.log(error.message);
    }
  });

export default router;
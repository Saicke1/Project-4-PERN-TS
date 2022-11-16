//create a Hotel with boolean
import express from "express";
import pool from "../dbConfig.js";

const router = express.Router();

//get all the hotels
router.get("/all", async (req, res) => {
  try {
    const allHotels = await pool.query("SELECT * FROM hotels");
    //console.log(response);
    //console.log(response.rows);
    res.json(allHotels.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//create a hotel
router.post("/all", async (req, res) => {
  try {
    //console.log(req.body);
    const { hotelname, hotelstars } = req.body;
    const newHotel = await pool.query(
      "INSERT INTO hotels (hotelname, hotelstars) VALUES($1, $2) RETURNING *",
      [hotelname, hotelstars]
    );
    res.json(newHotel.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//get one hotel
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await pool.query("SELECT * FROM hotels WHERE hotelid = $1", [
      id,
    ]);

    res.json(hotel.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//update one hotel
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { hotelname } = req.body;
    const updateHotel = await pool.query(
      "UPDATE hotels SET hotelname = $1 WHERE hotelid = $2",
      [hotelname, id]
    );

    res.json("Hotelname is updatet.");
  } catch (error) {
    console.log(error.message);
  }
});

//delete one hotel
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteHotel = await pool.query(
      "DELETE FROM hotels WHERE hotelid = $1",
      [id]
    );
    res.json("Hotel was deleted.");
  } catch (error) {
    console.log(error.message);
  }
});

export default router;

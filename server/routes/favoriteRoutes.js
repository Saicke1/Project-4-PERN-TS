import express from "express";
import { getAllFavs, getHotelFavs, createFav, removeFav, hotelDataFavs } from "../controllers/favoriteController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { jwtAuth } from "../middleware/passport.js";
import { authorizationToken } from "../middleware/authorization.js";

const router = express.Router();

router.get("/all", jwtAuth, getAllFavs);
router.get("/hotelfavs", jwtAuth, getHotelFavs);
router.post("/create", jwtAuth, createFav);
router.delete("/remove", jwtAuth, removeFav);
router.get("/hoteldata", jwtAuth, hotelDataFavs);

export default router;
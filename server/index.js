//const express = require("express"); alter import, nicht nötig weil im package.json the type: module eingetragen ist
import express from "express";
import cors from "cors";
import passport from "passport";
import * as dotenv from "dotenv";
import { passportConfig } from "./middleware/passport.js";
/* import pool from "./dbConfig.js"; */

//routes without a Controller
import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

//new Routes with controllers
import usersRoutes from "./routes/usersRoutes.js";
import commentsRoutes from "./routes/commentsRoutes.js";


console.log("Console log nodemon is working.");

dotenv.config({ path: "./.env.local" });

//create express app
const app = express();

//instantiate router depature and add it to the express app
const router = express.Router();
app.use(router);

//middleware
app.use(express.json()); //req.body
app.use(
  express.urlencoded({
    extended: true,
  })
);

// set the cross origin security to allow all origin (TO BE CHANGED IN PRODUCTION!)
app.use(cors());

//test and write GET route for HOME Page
/* router.get("/", (req, res) => {
  res.send({ msg: "Homepage route is working!" });
}); */

//Initialize the using of a passport
app.use(passport.initialize());
passportConfig(passport);

//define the port of our server
app.listen(5000, () => {
  console.log("Server is now listening at port 5000.");
});

app.use("/user", userRoutes);
app.use("/hotel", hotelRoutes);
app.use("/comment", commentRoutes);

//Routes with Controllers
app.use("/users", usersRoutes);
app.use("/comments", commentsRoutes);
app.use("/favorites", favoriteRoutes);

export default app;

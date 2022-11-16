//const express = require("express"); alter import, nicht nötig weil im package.json the type: module eingetragen ist
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import cors from "cors";
import pool from "./dbConfig.js";
console.log("Console log nodemon is working.");

//create express app
const app = express();

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(
  express.urlencoded({
    extended: true,
  })
);

//instantiate router depature and add it to the express app
const router = express.Router();
app.use(router);

/* WORKS!
app.get("/", (req, res) => {
  console.log("app.get is working");
  res.send("Hello");
}); */

//write GET route for HOME Page
/* router.get("/", (req, res) => {
  res.send({ msg: "Homepage route is working!" });
}); */

app.use("/user", userRoutes);
app.use("/hotel", hotelRoutes);

//define the port of our server
app.listen(5000, () => {
  console.log("Server is now listening at port 5000.");
});

export default app;

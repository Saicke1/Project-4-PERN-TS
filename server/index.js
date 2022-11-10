import express from "express";
//const express = require("express"); alter import, nicht nötig weil im package.json the type: module eingetragen ist
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
console.log("Console log nodemon is working.");

//create express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//instantiate router deature and add it to the express app
const router = express.Router();
app.use(router);

/* WORKS!
app.get("/", (req, res) => {
  console.log("app.get is working");
  res.send("Hello");
}); */

//write GET route for HOME Page
router.get("/", (req, res) => {
  res.send({ msg: "Homepage route is working!" });
});

//write GET route for TEST Page
router.get("/test", (req, res) => {
  res.send({ msg: "Test route is working!" });
});

app.use("/users", userRoutes);

//define the port of our server
app.listen(5000, () => {
  console.log("Server is now listening at port 5000.");
});

export default app;

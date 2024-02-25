require("dotenv").config();
require("./src/db/connection");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const route = require("./src/routes/user");

// middleware
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/", route);

app.get("/", (req, res) => {
  res.send("Server is Online ✌️");
});

//server
const PORT = process.env.PORT || 5502;
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//ROUTE IMPORTS
const authRoutes = require("./routes/auth/auth");
const categoryRoutes = require("./routes/category/category");

//CONFIGS
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Max-Age": 1000000,
  })
);

//ROUTES
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);

// SETTING UP SERVER
const port = 8000;
app.listen(port, () => console.log(`App is Running @ ${port}`));

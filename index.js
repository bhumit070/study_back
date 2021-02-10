require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//ROUTES
const authRoutes = require("./routes/auth");

//CONFIGS
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authRoutes);

// DB CONNECTION AND SETTING UP SERVER
const port = 8081;
app.listen(port, () => console.log(`App is Running @ ${port}`));

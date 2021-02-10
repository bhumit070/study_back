require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//ROUTE IMPORTS
const authRoutes = require("./routes/auth/auth");
const adminRoutes = require("./routes/admin/admin");

//CONFIGS
app.use(bodyParser.json());
app.use(cookieParser());

//ROUTES
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

// SETTING UP SERVER
const port = 8000;
app.listen(port, () => console.log(`App is Running @ ${port}`));

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const registerRoute = require("./Routes/register");

const connectDB = require("./Config/db");

const app = express();
const port = 8000;
dotenv.config();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api", registerRoute);
app.listen(port, () => {
  console.log("Listeing at port", port);
});

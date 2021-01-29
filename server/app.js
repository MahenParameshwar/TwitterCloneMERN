const express = require("express");
const cors = require("cors");

const connectDB = require("./Config/db");

const dotenv = require("dotenv");

const registerRoute = require("./Routes/register");
const loginRoute = require("./Routes/login");
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/post");

const app = express();
const port = 8000;
dotenv.config();

connectDB();

app.use(express.json());

app.use(cors());

app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", userRoute);
app.use("/api", postRoute);

app.listen(port, () => {
  console.log("Listeing at port", port);
});

const express = require("express");
const cors = require("cors");

const connectDB = require("./Config/db");

const dotenv = require("dotenv");

const registerRoute = require("./Routes/register");
const loginRoute = require("./Routes/login");
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/post");
const profileRoute = require("./Routes/profile");

const bodyParser = require("body-parser");

const app = express();
const port = 8000;
dotenv.config();

connectDB();

app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", userRoute);
app.use("/api", postRoute);
app.use("/api", profileRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("You are connected");
});

const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();
require("express-async-errors");

const authRouter = require("./routes/authRoutes");

// other packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// connect DB

const connectDB = require("./db/connect");

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

app.get("/", (req, res) => res.status(200).send("E-commerce-API!"));
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`listening on port ${port}!`));
  } catch (error) {
    console.log(error);
  }
};

start();

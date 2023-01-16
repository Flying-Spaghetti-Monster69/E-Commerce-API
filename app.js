const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();
require("express-async-errors");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

// other packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// connect DB

const connectDB = require("./db/connect");

// middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

app.get("/", (req, res) => res.status(200).send("E-commerce-API!"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

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

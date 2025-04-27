import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/user.router.js";
import SubscriptionRouter from "./src/routes/subscription.routes.js";
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());
// help to process the fromdata sent by html forms in a simple format
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //reads cookies from incoming requests so app can store user data
app.use(arcjetMiddleware());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", SubscriptionRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT, async () => {
  console.log(
    `Subscription Tracker API is running on http://localhost:${PORT}`
  );
  await connectDB();
});
export default app;

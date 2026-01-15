import express from "express";
import cors from "cors";
import { signupRouter } from "./routes/signupRouter.js";
import { loginRouter } from "./routes/loginRouter.js";
import { usersRouter } from "./routes/usersRouter.js";
import { postsRouter } from "./routes/postsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

const PORT = process.env["PORT"] || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});

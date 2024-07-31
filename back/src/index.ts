import express, { json, urlencoded } from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.routes";
import usersRouter from "./routes/users.routes";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import authentification from "./middlewares/authentication.middleware";

const app = express();

config()
app
  .use(cookieParser())
  .use(cors())
  .use(json())
  .use(urlencoded())
  .use(authentification)
  .use("/auth", authRouter)
  .use("/projects", projectsRouter)
  .use("/users", usersRouter)
  .listen(3000, ()=>{
    console.log("Listening on port 3000");
  })

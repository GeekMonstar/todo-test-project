import express, { json, urlencoded } from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.routes";
import usersRouter from "./routes/users.routes";
import { config } from "dotenv";
import authRouter from "./routes/auth.routes";

const app = express();

config()
app
  .use(cors())
  .use(json())
  .use(urlencoded())
  .use("/auth", authRouter)
  .use("/projects", projectsRouter)
  .use("/users", usersRouter)
  .listen(3000, ()=>{
    console.log("Listening on port 3000");
  })

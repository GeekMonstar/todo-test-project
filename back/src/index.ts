import express, { json, urlencoded } from "express";
import cors from "cors";
import projectsRouter from "./routes/projects.routes";
import usersRouter from "./routes/users.routes";

const app = express();

app
  .use(cors())
  .use(json())
  .use(urlencoded())
  .use("/projects", projectsRouter)
  .use("/users", usersRouter)
  .listen(3000, ()=>{
    console.log("Listening on port 3000");
  })

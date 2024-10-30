import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import { getUserRoutes } from './routes/userRoutes';
import { getFileRoutes } from './routes/fileRoutes';
import { getShareLinkRoutes } from './routes/shareLinkRoutes';
import { auth } from "./middleware/auth"
import { getRepositories } from "./repository/repository"

const server = express();
const port = 3001;
const database = await mysql.createConnection({
  host: process.env.DB_HOST,
  user:  process.env.DB_USER,
  password:  process.env.DB_PASSWORD,
  port: 3306,
  database:  "file_manager",
});
const repositories = getRepositories(database)

server.use(cors())
server.use(express.json())
server.use(express.static("./private"))

server.use("/user", getUserRoutes(repositories.userRepository))
server.use("/file", getFileRoutes(repositories))
server.use("/shareLink", getShareLinkRoutes(repositories))

// server.use(auth)

server.listen(port, () => console.log("Server is listening on port " + port))


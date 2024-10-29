import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import { getRoutes } from './routes/routes';
import { auth } from "./middleware/auth"

const server = express();
const port = 3000;
const database = await mysql.createConnection({
  host: process.env.DB_HOST,
  user:  process.env.DB_USER,
  password:  process.env.DB_PASSWORD,
  port: 3306,
  database:  "file_manager",
});
const routes = getRoutes(database)

server.use(cors())
server.use(express.json())

server.use(auth)

server.listen(port, () => console.log("Server is listening on port " + port))


import express from "express";
import type { Request, Response, NextFunction } from "express";
import path from "path";
import expressSession from "express-session";
import dotenv from "dotenv";
dotenv.config();

import knexConfig from "./knexfile";
import Knex from "knex";
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

declare module "express-session" {
  interface SessionData {
    isLoggedIn?: boolean;
  }
}

const app = express();

// Section 1: Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  expressSession({
    secret: "JavIdols",
    resave: true,
    saveUninitialized: true,
  })
);


// Controllers
import { IdolController} from "./controllers/IdolController";

// Services
import { IdolService } from "./services/IdolService";


const idolService = new IdolService(knex);
export const idolController = new IdolController(idolService);

// Section 2: Route Handlers

import { idolRoutes } from "./routers/idolRoutes";

app.use("/idols", idolRoutes);


// Section 3: Serve
app.use(express.static(path.join(__dirname, "public")));


// Section 4: Error Handling
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

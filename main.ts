import express from "express";
import type { Request, Response, NextFunction } from "express";
import path from "path";
import expressSession from "express-session";
import http from "http";
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
    secret: "javidols",
    resave: true,
    saveUninitialized: true,
  })
);


// Controllers

import { MemoController } from "./controllers/MemoController";

// Services

import { MemoService } from "./services/MemoService";


// Section 2: Route Handlers

import {idolsRoutes} from "./routers/idolRoutes"

app.use("/idols", idolsRoutes);


// Section 3: Serve
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "uploads")));
const guardMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.isLoggedIn) next();
  else res.redirect("/");
};
app.use(guardMiddleware, express.static(path.join(__dirname, "private")));

// Section 4: Error Handling
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

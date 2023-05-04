import { idolController } from "./../main";
import express from "express";

export const idolRoutes = express.Router();


idolRoutes.get("/", idolController.getAllIdols);


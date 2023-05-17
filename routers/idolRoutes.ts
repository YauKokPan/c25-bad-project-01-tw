import { idolController } from "./../main";
import express, { Request, Response } from "express";

export const idolRoutes = express.Router();

idolRoutes.get("/", idolController.getAllIdols);
idolRoutes.get("/:id", idolController.getIdolsById);

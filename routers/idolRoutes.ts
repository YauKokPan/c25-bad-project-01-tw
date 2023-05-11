import {
  idolController,
  pageController,

} from "./../main";
import express, { Request, Response } from "express";


export const idolRoutes = express.Router();
export const postImageRoutes = express.Router();
export const pageRoutes = express.Router();

idolRoutes.get("/", idolController.getAllIdols);
idolRoutes.get("/:id", idolController.getIdolsById);
pageRoutes.get("/",pageController.getPages);


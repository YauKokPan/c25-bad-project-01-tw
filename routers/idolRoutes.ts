import { idolController ,galleryController} from "./../main";
import express from "express";

export const idolRoutes = express.Router();
export const galleryRoutes = express.Router();

idolRoutes.get("/", idolController.getAllIdols);
idolRoutes.get("/:id", idolController.getIdolsById);
galleryRoutes.get("/",galleryController.getAllGallery);

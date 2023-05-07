import {
  idolController,
  galleryController,
  // uploadImageController,
} from "./../main";
import express, { Request, Response } from "express";
import { form, formParsePromise } from "../utils/formidable";

export const idolRoutes = express.Router();
export const galleryRoutes = express.Router();
export const postImageRoutes = express.Router();

idolRoutes.get("/", idolController.getAllIdols);
idolRoutes.get("/:id", idolController.getIdolsById);
galleryRoutes.get("/", galleryController.getAllGallery);
galleryRoutes.get("/:id",galleryController.getGalleryById)
// idolRoutes.post("/postImage", uploadImageController.postIdolImage);

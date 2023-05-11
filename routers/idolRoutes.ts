import {
  idolController,
  galleryController,
  searchController,
  pageController,
  // uploadImageController,
} from "./../main";
import express, { Request, Response } from "express";
import { form, formParsePromise } from "../utils/formidable";

export const idolRoutes = express.Router();
export const postImageRoutes = express.Router();
export const searchRoutes = express.Router();
export const pageRoutes = express.Router();

idolRoutes.get("/", idolController.getAllIdols);
idolRoutes.get("/:id", idolController.getIdolsById);
searchRoutes.get("/",searchController.getSearchResult);
pageRoutes.get("/",pageController.getPages);
// idolRoutes.post("/postImage", uploadImageController.postIdolImage);

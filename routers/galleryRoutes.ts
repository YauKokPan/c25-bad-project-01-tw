import express from "express";
import { galleryController } from "../main";

export const galleryRoutes = express.Router();

galleryRoutes.get("/", galleryController.getAllGallery);
galleryRoutes.get("/:id",galleryController.getGalleryById)
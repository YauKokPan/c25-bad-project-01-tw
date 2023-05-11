import type { Request, Response } from "express";
import { GalleryService } from "../services/galleryService";

export class GalleryController {
    constructor(private galleryService: GalleryService) {}
  
    getAllGallery = async (_req: Request, res: Response) => {
      try {
        const gallery = await this.galleryService.getAllGallery();
        res.json(gallery); // pass array into res.json()
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "internal server error" });
      }
    };
  
    getGalleryById = async (req: Request, res: Response) => {
      try {
        const id = +req.params.id;
        const serviceResponse = await this.galleryService.getGalleryById(id);
        res.status(200).json({ data: serviceResponse });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: "internal server error" });
      }
    };
  }
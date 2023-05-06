import formidable from "formidable";
import { form, formParsePromise } from "../utils/formidable";
import { IdolService, GalleryService } from "../services/IdolService";
import type { Request, Response } from "express";
import { couldStartTrivia } from "typescript";

export class IdolController {
  constructor(private idolService: IdolService) {}

  getAllIdols = async (_req: Request, res: Response) => {
    try {
      const idols = await this.idolService.getAllIdols();
      res.json(idols); // pass array into res.json()
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "internal server error" });
    }
  };

  getIdolsById = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id;
      const serviceResponse = await this.idolService.getIdolsById(id);
      res.status(200).json({ data: serviceResponse });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "internal server error" });
    }
  };
}

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
}

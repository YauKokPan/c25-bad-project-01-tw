import { IdolService, GalleryService, SearchService, PageService } from "../services/IdolService";
import type { Request, Response } from "express";

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

export class SearchController {
  constructor(private searchService: SearchService) {}

  getSearchResult = async (req: Request, res: Response) => {
    try {
      const searchTerm = req.query.q as string; // use type assertion
      const result = await this.searchService.getSearchResult(searchTerm);
      res.json(result); // pass array into res.json()
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "internal server error" });
    }
  };
}

export class PageController {
  constructor(private pageService: PageService) {}

  getPages = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const idols = await this.pageService.getPages(page);
      res.json(idols); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "internal server error" });
    }
  };
}

// export class UploadImageController {}

// postIdolImage = async (req: Request, res: Response) => {
//   try {
//     form.parse(req, async (err, fields, files) => {
//       res = await fetch("http://localhost:8080/postImage", {
//         method: "POST",
//         body: form,
//       });
//       const data = await res.json();
//       res.json({ msg: "successfully post new image", data });
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to call the AI model." });
//   }
// };

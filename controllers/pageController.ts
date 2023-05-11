import type { Request, Response } from "express";
import { PageService } from "../services/pageService";

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
  
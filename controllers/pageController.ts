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

  getTotalPages = async (req: Request, res: Response) => {
    try {
      const totalPages = await this.pageService.getTotalPages();
      res.status(200).json({ msg: "ok", data: { totalPages } });
    } catch (e) {
      res.status(500).json({ msg: "internal server error." });
    }
    return 10;
  };

  getInfoByPage = async (req: Request, res: Response) => {
    try {
      const page = req.query.page || 1;
      const result = await this.pageService.getInfoByPage(Number(page));
      res.status(200).json({ msg: "ok", data: result });
    } catch (e) {
      res.status(402).json({
        msg: "invalid input",
      });
    }
  };
}

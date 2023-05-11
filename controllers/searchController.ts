import type { Request, Response } from "express";
import { SearchService } from "../services/searchService";

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
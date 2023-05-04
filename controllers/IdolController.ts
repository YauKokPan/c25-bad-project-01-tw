import formidable from "formidable";
import { form, formParsePromise } from "../formidable";
import { IdolService } from "../services/IdolService";
import type { Request, Response } from "express";


export class IdolController {
  constructor(private IdolService: IdolService) {}

  getAllIdols = async (_req: Request, res: Response) => {
    try {
      const idols = await this.IdolService.getAllIdols();
      res.json(idols); // pass array into res.json()
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "internal server error" });
    }
  };

}

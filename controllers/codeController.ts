import type { Request, Response } from "express";
import { CodeService } from "../services/codeService";


export class CodeController {
    constructor(private codeService: CodeService) {}
  
    getAllCodes = async (_req: Request, res: Response) => {
      try {
        const code = await this.codeService.getAllCodes();
        res.json(code); // pass array into res.json()
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "internal server error" });
      }
    };
  
    getCodeById = async (req: Request, res: Response) => {
      try {
        const id = +req.params.id;
        const serviceResponse = await this.codeService.getCodeById(id);
        res.status(200).json({ data: serviceResponse });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: "internal server error" });
      }
    };
  }
import formidable from "formidable";
import { form, formParsePromise } from "../formidable";
import { IdolService } from "../services/IdolService";
import type { Request, Response } from "express";
import type { Server as SocketIO } from "socket.io";

export class IdolController {
  constructor(private memoService: IdolService) {}

  getAllIdols = async (_req: Request, res: Response) => {
    try {
      const idols = await this.idolService.getAllMemos();
      res.json(memos); // pass array into res.json()
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "internal server error" });
    }
  };

  createMemo = async (req: Request, res: Response) => {
    try {
      const { fields, files } = await formParsePromise(form, req);
      const content = fields.content as string;
      if (!content) {
        res.status(400).json({ message: "missing content" });
        return;
      }
      const imageFilename = (files.image as formidable.File | undefined)?.newFilename;

      await this.memoService.createMemo(content, imageFilename);

      // Broadcast
      this.io.emit("create_memo");

      res.json({ message: "success" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "internal server error" });
    }
  };

}

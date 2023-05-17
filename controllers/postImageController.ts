import { Request, Response } from "express";
import { PostImageService } from "../services/postImageService";

export class PostImageController {
  constructor(private postImageService: PostImageService) {}

  postImage = async (req: Request, res: Response) => {
    try {
      const filename = req.file!.filename;
      const results = await this.postImageService.postImage(filename);
      res.status(200).json({ msg: "uploaded", data: results });
    } catch (e) {
      res.status(405).json({ msg: "upload failed" });
    }
  };
}

import { PostImageService } from "../services/postImageService";
import { Request, Response } from "express";
import { upload } from "../main";
export class PostImageController {
  constructor(private postImageService: PostImageService) {}

  postImage = async (req: Request, res: Response) => {
    const filename = req.file!.filename;
    console.log("check !!!!!!!!!!",filename)

    console.log(this.postImageService)


  };
}

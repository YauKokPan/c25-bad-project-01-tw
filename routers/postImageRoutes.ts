import express from "express";
import { postImageController } from "../main";
import { upload } from "../main";

export const postImageRoutes = express.Router();

postImageRoutes.post("/", upload.single("file"), postImageController.postImage);

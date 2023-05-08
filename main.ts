import express from "express";
import type { Request, Response, NextFunction } from "express";
import path from "path";
import expressSession from "express-session";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import fs from "fs";
import axios from "axios";

import knexConfig from "./knexfile";
import Knex from "knex";
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

declare module "express-session" {
  interface SessionData {
    idol: {
      id: number;
      idol_name: string;
      idol_info: string;
      profile_pic: string;
    };
  }
}

const app = express();

// Section 1: Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  expressSession({
    secret: "JavIdols",
    resave: true,
    saveUninitialized: true,
  })
);

// const directory = "./public/uploads";

// // Create the directory if it does not exist
// if (!fs.existsSync(directory)) {
//   fs.mkdirSync(directory, { recursive: true });
// }
// searchByImage upload photos
// const uploadPath = path.join(__dirname, "public", "uploads");
// console.log("uploadPath: ", uploadPath);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${path.join(__dirname, "public", "uploads")}`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});
// 處理圖片提交事件
app.post("/postImage", upload.single("file"), async (req, res) => {
  const filename = req.file!.filename;
  console.log("fullpath: ", filename);
  // const newPath = `${req.file!.originalname}`;
  // fs.rename(oldPath, newPath, () => {
  //   console.log("uploaded file: ", newPath);
  // });
  try {
    const resp = await axios(`http://127.0.0.1:8000/postImage?img=${filename}`);
    const result = resp.data;
    console.log(result);
    console.log("python result: ", result);
  } catch (e) {
    // console.log(e);
  }
  res.status(200).json({ msg: "uploaded" });
});

// Controllers
import {
  IdolController,
  GalleryController,
  // UploadImageController,
} from "./controllers/IdolController";

// Services
import { IdolService, GalleryService } from "./services/IdolService";

const idolService = new IdolService(knex);
export const idolController = new IdolController(idolService);

const galleryService = new GalleryService(knex);
export const galleryController = new GalleryController(galleryService);

// Section 2: Route Handlers

import { idolRoutes, galleryRoutes } from "./routers/idolRoutes";

app.use("/idols", idolRoutes);
app.use("/gallery", galleryRoutes);

// Section 3: Serve
app.use(express.static(path.join(__dirname, "public")));

// Section 4: Error Handling
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

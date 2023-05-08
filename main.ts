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

// searchByImage upload photos
const upload = multer({
  dest: "./public/uploads/",
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error("只能上傳圖片。"));
    }
    cb(null, true);
  },
});
// 處理圖片提交事件
app.post("/postImage", upload.single("file"), async (req, res) => {
  const oldPath = req.file!.path;
  const newPath = `${req.file!.originalname}`;
  fs.rename(oldPath, newPath, () => {
    // res.send("success");
    console.log("uploaded file: ", newPath);
  });
  try {
    const resp = await axios(`http://localhost:8000/postImage?img=${newPath}`);
    const result = resp.data;
    console.log("python result: ", result);
  } catch (e) {
    console.log(e);
  }
  res.status(200).json({ msg: "uploaded" });
});

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

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

const uploadPath = path.join(__dirname, "public", "uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${uploadPath}`);
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
  // console.log("fullpath: ", filename);
  try {
    const resp = await axios(`http://127.0.0.1:8000/postImage?img=${filename}`);
    const result = resp.data;
    console.log(result);
    console.log("you are in nodejs python result: ", result);
    const output:
      | {
          name: string;
          prob: number;
          id: number;
          img: string;
        }[]
      | null = [];
    for (let elem of result.results) {
      console.log("elem", elem);
      const name = elem.split(":")[0];
      const prob = elem.split(" ").pop();
      await knex("javidols")
        .select("*")
        .where("idol_name", name)
        .then((obj) => {
          const outputObj = {
            name,
            prob,
            id: obj[0].id,
            img: obj[0].profile_pic,
          };

          output.push(outputObj);
          // console.log("123", outputObj);
        });
    }

    res.status(200).json({ msg: "uploaded", data: output });
  } catch (e) {
    // console.log(e);
    res.status(405).json({ msg: "upload failed" });
  }
});

// Controllers
import {
  IdolController,
  SearchController,
  PageController,
  // UploadImageController,
} from "./controllers/IdolController";

// Services
import {
  IdolService,
  SearchService,
  PageService,
} from "./services/IdolService";

import { GalleryService } from "./services/galleryService";
import { GalleryController } from "./controllers/galleryController";

const idolService = new IdolService(knex);
export const idolController = new IdolController(idolService);

const galleryService = new GalleryService(knex);
export const galleryController = new GalleryController(galleryService);

const searchService = new SearchService(knex);
export const searchController = new SearchController(searchService);

const pageService = new PageService(knex);
export const pageController = new PageController(pageService);

// Section 2: Route Handlers

import { idolRoutes,searchRoutes, pageRoutes } from "./routers/idolRoutes";

import {galleryRoutes} from "./routers/galleryRoutes"


app.use("/idols", idolRoutes);
app.use("/gallery", galleryRoutes);
app.use("/search", searchRoutes);
app.use('/page',pageRoutes);

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

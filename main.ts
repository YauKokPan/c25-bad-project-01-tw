import express from "express";
import path from "path";
import expressSession from "express-session";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
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
  try {
    const resp = await axios(`http://127.0.0.1:8000/postImage?img=${filename}`);
    const result = resp.data;
    const output:
      | {
          name: string;
          prob: number;
          id: number;
          img: string;
        }[]
      | null = [];
    for (let elem of result.results) {
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
        });
    }

    res.status(200).json({ msg: "uploaded", data: output });
  } catch (e) {
    res.status(405).json({ msg: "upload failed" });
  }
});

//service & controller

import { IdolController } from "./controllers/IdolController";
import { IdolService } from "./services/IdolService";

const idolService = new IdolService(knex);
export const idolController = new IdolController(idolService);

import { GalleryService } from "./services/galleryService";
import { GalleryController } from "./controllers/galleryController";

const galleryService = new GalleryService(knex);
export const galleryController = new GalleryController(galleryService);

import { SearchService } from "./services/searchService";
import { SearchController } from "./controllers/searchController";

const searchService = new SearchService(knex);
export const searchController = new SearchController(searchService);

import { PageService } from "./services/pageService";
import { PageController } from "./controllers/pageController";

const pageService = new PageService(knex);
export const pageController = new PageController(pageService);

import { CodeService } from "./services/codeService";
import { CodeController } from "./controllers/codeController";

const codeService = new CodeService(knex);
export const codeController = new CodeController(codeService);

// Section 2: Route Handlers

import { idolRoutes } from "./routers/idolRoutes";
import { galleryRoutes } from "./routers/galleryRoutes";
import { searchRoutes } from "./routers/searchRoutes";
import { pageRoutes } from "./routers/pageRoutes";
import { codeRoutes } from "./routers/codeRoutes";

app.use("/idols", idolRoutes);
app.use("/gallery", galleryRoutes);
app.use("/search", searchRoutes);
app.use("/page", pageRoutes);
app.use("/code", codeRoutes);

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

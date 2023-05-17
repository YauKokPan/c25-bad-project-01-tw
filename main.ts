import express from "express";
import path from "path";
import expressSession from "express-session";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";

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

// multer for image upload
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
export const upload = multer({
  storage: storage,
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

import { PostImageService } from "./services/postImageService";
import { PostImageController } from "./controllers/postImageController";

const postImageService = new PostImageService(knex);
export const postImageController = new PostImageController(postImageService);

// Section 2: Route Handlers

import { idolRoutes } from "./routers/idolRoutes";
import { galleryRoutes } from "./routers/galleryRoutes";
import { searchRoutes } from "./routers/searchRoutes";
import { pageRoutes } from "./routers/pageRoutes";
import { codeRoutes } from "./routers/codeRoutes";
import { postImageRoutes } from "./routers/postImageRoutes";

app.use("/idols", idolRoutes);
app.use("/gallery", galleryRoutes);
app.use("/search", searchRoutes);
app.use("/page", pageRoutes);
app.use("/code", codeRoutes);
app.use("/postImage", postImageRoutes);

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

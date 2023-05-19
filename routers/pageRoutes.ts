import express from "express";
import { pageController } from "../main";

export const pageRoutes = express.Router();

pageRoutes.get("/totalpages", pageController.getTotalPages);
pageRoutes.get("/", pageController.getInfoByPage);

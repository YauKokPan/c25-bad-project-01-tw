import express from "express";
import { searchController } from "../main";

export const searchRoutes = express.Router();

searchRoutes.get("/", searchController.getSearchResult);

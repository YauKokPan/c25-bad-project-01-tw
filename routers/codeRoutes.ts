import express from "express";
import { codeController } from "../main";

export const codeRoutes = express.Router();

codeRoutes.get("/", codeController.getAllCodes);
codeRoutes.get("/:id",codeController.getCodeById)
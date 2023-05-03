import { memoController } from "./../server";
import express from "express";

export const memoRoutes = express.Router();

memoRoutes.post("/", memoController.createMemo);
memoRoutes.get("/", memoController.getAllMemos);
memoRoutes.put("/:mid", memoController.updateMemo);
memoRoutes.delete("/:mid", memoController.deleteMemo);
memoRoutes.get("/like_memos", memoController.getLikeMemos);

//Testing target: galleryController
//Mock target: Dependency of galleryController

import { describe } from "node:test";
import { GalleryService } from "../services/galleryService";
import type { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import type { Knex } from "knex";
import { GalleryController } from "../controllers/galleryController";

describe("galleryController TestCases", () => {
  let galleryService: GalleryService;
  let galleryController: GalleryController;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    galleryService = new GalleryService({} as Knex);
    galleryService.getAllGallery = jest.fn(() =>
      Promise.resolve([
        { id: 1, idol_id: 1, idol_name: "test", idol_image: "test" },
      ])
    );
    galleryService.getGalleryById = jest.fn();

    galleryController = new GalleryController(galleryService);

    req = {
      params: {},
      query: {},
      body: {},
    } as Request;
    res = {
      json: jest.fn(),
    } as any as Response;
  });

  it("Get all gallery - Success", async () => {
    await galleryController.getAllGallery(req, res);
    expect(galleryService.getAllGallery).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith([
      { id: 1, idol_id: 1, idol_name: "test", idol_image: "test" },
    ]);
  });
});

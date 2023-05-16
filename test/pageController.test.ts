//Testing target: galleryController
//Mock target: Dependency of galleryController

import { describe } from "node:test";
import { PageService } from "../services/pageService";
import type { Request, Response } from "express";

import type { Knex } from "knex";
import { PageController } from "../controllers/pageController";

describe("pageController TestCases", () => {
  let pageService: PageService;
  let pageController: PageController;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    pageService = new PageService({} as Knex);
    pageService.getPages = jest.fn((page: number) =>
      Promise.resolve([
        { id: 1, idol_name: "test", idol_info: "test", profile_pic: "test" },
      ])
    );
    pageService.getTotalPages = jest.fn();
    pageService.getInfoByPage = jest.fn();

    pageController = new PageController(pageService);

    req = {
      params: {},
      query: {},
      body: {},
    } as Request;
    res = {
      json: jest.fn(),
    } as any as Response;
  });

  it("Get search result- Success", async () => {
    await pageController.getPages(req, res);
    expect(pageService.getPages).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith([
      {
        id: 1,
        idol_name: "test",
        idol_info: "test",
        profile_pic: "test",
      },
    ]);
  });
});

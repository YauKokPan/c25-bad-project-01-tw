//Testing target: galleryController
//Mock target: Dependency of galleryController

import { describe } from "node:test";
import { SearchService } from "../services/searchService";
import type { Request, Response } from "express";

import type { Knex } from "knex";
import { SearchController } from "../controllers/searchController";

describe("searchController TestCases", () => {
  let searchService: SearchService;
  let searchController: SearchController;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    searchService = new SearchService({} as Knex);
    searchService.getSearchResult = jest.fn(() =>
      Promise.resolve([{ searchTerm: "test" }])
    );

    searchController = new SearchController(searchService);

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
    await searchController.getSearchResult(req, res);
    expect(searchService.getSearchResult).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith([{ searchTerm: "test" }]);
  });
});

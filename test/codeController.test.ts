//Testing target: galleryController
//Mock target: Dependency of galleryController

import { describe } from "node:test";
import { CodeService } from "../services/codeService";
import type { Request, Response } from "express";

import type { Knex } from "knex";
import { CodeController } from "../controllers/codeController";

describe("codeController TestCases", () => {
  let codeService: CodeService;
  let codeController: CodeController;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    codeService = new CodeService({} as Knex);
    codeService.getAllCodes = jest.fn(() =>
      Promise.resolve([
        {
          id: 1,
          idol_id: 1,
          idol_name: "test",
          idol_code: "test",
          title: "test",
          release_date: "2023-05-11",
        },
      ])
    );
    codeService.getCodeById = jest.fn();

    codeController = new CodeController(codeService);

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
    await codeController.getAllCodes(req, res);
    expect(codeService.getAllCodes).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith([
      {
        id: 1,
        idol_id: 1,
        idol_name: "test",
        idol_code: "test",
        title: "test",
        release_date: "2023-05-11",
      },
    ]);
  });
});

//Testing target: idolController
//Mock target: Dependency of idolController

import { describe } from "node:test";
import { IdolService } from "../services/IdolService";
import type { Request, Response } from "express";

import type { Knex } from "knex";
import { IdolController } from "../controllers/IdolController";

describe("idolController TestCases", () => {
  let idolService: IdolService;
  let idolController: IdolController;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    idolService = new IdolService({} as Knex);
    idolService.getAllIdols = jest.fn(() =>
      Promise.resolve([
        { id: 1, idol_name: "test", idol_info: "test", profile_pic: "test" },
      ])
    );
    idolService.getIdolsById = jest.fn();

    idolController = new IdolController(idolService);

    req = {
      params: {},
      query: {},
      body: {},
    } as Request;
    res = {
      json: jest.fn(),
    } as any as Response;
  });

  it("Get all idols - Success", async () => {
    await idolController.getAllIdols(req, res);
    expect(idolService.getAllIdols).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith([
      { id: 1, idol_name: "test", idol_info: "test", profile_pic: "test" },
    ]);
  });
});

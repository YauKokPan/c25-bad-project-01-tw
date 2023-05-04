import { Idols } from "../model";
import { Gallery } from "../model";
import type { Knex } from "knex";

export class IdolService {
  constructor(private knex: Knex) {}


  getAllIdols = async () => {
    const queryResult = await this.knex<Idols>("javidols")
      .select("id", "idol_id", "idol_name","idol_info","profile_pic")
      .orderBy("id", "desc");

    return queryResult;
  };
}

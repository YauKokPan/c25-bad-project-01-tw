import { Idols } from "../model";
import type { Knex } from "knex";

export class SearchService {
  constructor(private knex: Knex) {}

  getSearchResult = async (searchTerm: string) => {
    const queryResult = await this.knex<Idols>("javidols")
      .join("idolcode", "javidols.id", "idolcode.idol_id")
      .select(
        "javidols.*",
        this.knex.raw("MAX(idolcode.idol_code) AS idol_code")
      )
      .distinct()
      .where("javidols.idol_name", "like", `%${searchTerm}%`)
      .orWhere("idolcode.idol_code", "=", `${searchTerm}`)
      .groupBy("javidols.idol_name", "javidols.id", "javidols.created_at")
      .orderBy("javidols.id", "desc");

    return queryResult;
  };
}

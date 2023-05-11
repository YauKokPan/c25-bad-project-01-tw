import { Idols } from "../model";
import type { Knex } from "knex";

export class SearchService {
    constructor(private knex: Knex) {}
  
    getSearchResult = async (searchTerm: string) => {
      const queryResult = await this.knex<Idols>("javidols")
        .select("*")
        .where("idol_name", "like", `%${searchTerm}%`);
  
      return queryResult;
    };
  }
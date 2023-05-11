import { Idols } from "../model";
import type { Knex } from "knex";

export class PageService {
    constructor(private knex: Knex) {}
  
    getPages = async (page: number) => {
      const pageSize = 20; // Number of idols to display per page
      const offset = (page - 1) * pageSize;
      const queryResult = await this.knex<Idols>("javidols")
        .select("id", "idol_name", "idol_info", "profile_pic")
        .limit(pageSize)
        .offset(offset);
    
      return queryResult;
    };
  }
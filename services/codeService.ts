import { Code } from "../model";
import type { Knex } from "knex";

export class CodeService {
    constructor(private knex: Knex) {}
  
    getAllCodes = async () => {
      const queryResult = await this.knex<Code>("idolcode").select(
        "id",
        "idol_id",
        "idol_name",
        "idol_code",
        "title",
        "release_date"
      );
  
      return queryResult;
    };
  
    getCodeById = async (id:number) => {
      const queryResult = await this.knex<Code>("idolcode")
      .select('idolcode.idol_code', 'idolcode.title','idolcode.release_date')
      .join('javidols', 'javidols.id', '=', 'idolcode.idol_id')
      .where('javidols.id', id);
  
      return queryResult;
    };
  
  
  }
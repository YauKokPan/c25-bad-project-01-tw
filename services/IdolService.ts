import { Idols } from "../model";
import type { Knex } from "knex";

export class IdolService {
  constructor(private knex: Knex) {}

  getAllIdols = async () => {
    const queryResult = await this.knex<Idols>("javidols")
      .select("id", "idol_name", "idol_info", "profile_pic")
      .orderBy("id", "desc");

    return queryResult;
  };

  getIdolsById = async (id: number) => {
    const result = await this.knex<Idols>("javidols")
      .select("*")
      .where("javidols.id", id)
      // .join("gallery", "gallery.idol_id", "javidols.id");
    console.log("service getIdolsbyid: ", result);
    return result;
  };
}





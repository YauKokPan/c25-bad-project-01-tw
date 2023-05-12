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

  getTotalPages = async () => {
    const numberOfItemsPerPage = 8;
    const totalItems: { count: number } = await this.knex
      .count("id")
      .from("javidols")
      .first();
    const totalPages = Math.ceil(totalItems.count / numberOfItemsPerPage);
    return totalPages;
  };

  getInfoByPage = async (page: number) => {
    const itemPerPage = 8;
    const result = this.knex("javidols")
      .select("*")
      .limit(8)
      .offset((page - 1) * itemPerPage);
    return result;
  };
}
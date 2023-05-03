import { Idols } from "../model";
import { Gallery } from "../model";
import type { Knex } from "knex";

export class IdolService {
  constructor(private knex: Knex) {}

  // getAllMemos() {}
  getAllMemos = async () => {
    const queryResult = await this.knex<Idols>("javidols")
      .select("id", "content", "image")
      .orderBy("id", "desc");

    return queryResult;
  };

  createMemo = async (content: string, imageFilename?: string) => {
    await this.knex("memos").insert({ content, image: imageFilename });
  };

}

import knex, { Knex } from "knex";
import path from "path";

export async function seed(this: any, knex: Knex): Promise<void> {

  const idolsinfo = await this.knex.raw(
    'copy javidols(idol_name,idol_info,profile_pic,idol_id)from "/data/javidolsinfo.csv" DELIMITER ',' CSV HEADER;'
  );

  const idolsgallery = await this.knex.raw(
    'copy javidols(idol_name,idol_info,profile_pic,idol_id)from "/data/javidolsphoto.csv" DELIMITER ',' CSV HEADER;'
  );

  await knex("idols").del();
  await knex("gallery").del();

  await knex("javidols").insert(idolsinfo);
  await knex("gallery").insert(idolsgallery);
}



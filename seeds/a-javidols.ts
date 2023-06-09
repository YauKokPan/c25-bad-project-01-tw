import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { Knex } from "knex";

interface JavIdol {
  idol_name: string;
  idol_info: string;
  profile_pic: string;
}

export async function seed(knex: Knex): Promise<void> {
  await knex("idolcode").del();
  await knex("gallery").del();
  await knex("javidols").del();
  await knex.raw("ALTER SEQUENCE idolcode_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE gallery_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE javidols_id_seq RESTART WITH 1");

  try {
    const csvString = fs.readFileSync(
      path.join(__dirname, "..", "data", "javidolsinfo.csv"),
      "utf8"
    );

    let { data, errors } = Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
    });

    if (errors.length) {
      console.error(errors);
      process.exit(1);
    }

    const insertQueryString = `
      INSERT INTO javidols (idol_name, idol_info, profile_pic)
      VALUES ${(data as JavIdol[])
        .map(
          (row) =>
            `('${row.idol_name}', '${row.idol_info}', '${row.profile_pic}')`
        )
        .join(", ")};
    `;

    await knex.transaction(async (trx) => {
      await trx.raw(insertQueryString);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

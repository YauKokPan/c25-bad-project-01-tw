import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  try {
    const csvString = fs.readFileSync(
      path.join(__dirname, "..", "data", "javidolsgallery.csv"),
      "utf8"
    );

    const { data, errors } = Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
    });

    if (errors.length) {
      console.error(errors);
      process.exit(1);
    }

    const insertQueryString = `
      INSERT INTO gallery (idol_name,idol_image,idol_id)
      VALUES ${data
        .map(
          (row: { [key: string]: string }) =>
            `('${row.idol_name}', '${row.idol_image}', '${row.idol_id}')`
        )
        .join(", ")};
    `;

    await knex.transaction(async (trx) => {
      await trx.raw(insertQueryString);
      console.log("Gallery data seeded successfully!");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

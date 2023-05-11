import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { Knex } from "knex";

interface CodeData {
  idol_name: string;
  idol_code: string;
  idol_id: number;
  title: Text;
  release_date:string;
}

export async function seed(knex: Knex): Promise<void> {
  try {
    const csvString = fs.readFileSync(
      path.join(__dirname, "..", "data", "javidolscode.csv"),
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
      INSERT INTO idolcode (idol_id ,idol_name,idol_code,title,release_date)
      VALUES ${(data as CodeData[])
        .map(
          (row) => `('${row.idol_name}', '${row.idol_code}', '${row.idol_id}', '${row.title}', '${row.release_date}')`
        )
        .join(", ")};
    `;

    await knex.transaction(async (trx) => {
      await trx.raw(insertQueryString);
      console.log("Code data seeded successfully!");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

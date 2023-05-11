import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { Knex } from "knex";

interface CodeData {
  idol_name: string;
  idol_code: string;
  idol_id: number;
  title: string;
  release_date: string;
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

    const batchSize = 1000; // Adjust this value based on your performance requirements

    await knex.transaction(async (trx) => {
      await trx.batchInsert(
        "idolcode",
        data.map((row: CodeData) => ({
          idol_name: row.idol_name,
          idol_code: row.idol_code,
          idol_id: row.idol_id,
          title: row.title,
          release_date: row.release_date,
        })),
        batchSize
      );
      console.log("Code data seeded successfully!");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

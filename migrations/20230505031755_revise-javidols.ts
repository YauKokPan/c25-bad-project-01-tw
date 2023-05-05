import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table("javidols", (table) => {
    table.dropColumn("idol_id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table("javidols", (table) => {
    table.string("idol_id");
  });
}

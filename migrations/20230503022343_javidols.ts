import { Knex } from "knex";

const idolTable = "javidols";
const galleryTable = "gallery";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(idolTable, (table) => {
    table.increments(); // id
    table.integer("idol_id");
    table.string("idol_name").notNullable().unique();
    table.text("idol_info").notNullable();
    table.string("profile_pic").notNullable();
    table.timestamps(false, true); // created_at, updated_at
  });
  await knex.schema.createTable(galleryTable, (table) => {
    table.increments(); // id
    table.integer("idol_id");
    table.foreign("idol_id").references("javidols.id");
    table.string("idol_name").notNullable();
    table.string("idol_image");
    table.timestamps(false, true); // created_at, updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(galleryTable);
  await knex.schema.dropTableIfExists(idolTable);
}

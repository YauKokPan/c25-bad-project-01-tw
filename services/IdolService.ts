import { Idols } from "../model";
import { Gallery } from "../model";
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
    const result = await this.knex("javidols")
      .select("*")
      .where("javidols.id", id);
    // .join("gallery", "gallery.idol_id", "javidols.id");
    console.log("service getIdolsbyid: ", result);
    return result;
  };
}

export class GalleryService {
  constructor(private knex: Knex) {}

  getAllGallery = async () => {
    const queryResult = await this.knex<GalleryService>("gallery").select(
      "id",
      "idol_id",
      "idol_name",
      "idol_image"
    );

    return queryResult;
  };
}

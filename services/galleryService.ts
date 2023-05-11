import { Gallery } from "../model";
import type { Knex } from "knex";

export class GalleryService {
    constructor(private knex: Knex) {}
  
    getAllGallery = async () => {
      const queryResult = await this.knex<Gallery>("gallery").select(
        "id",
        "idol_id",
        "idol_name",
        "idol_image"
      );
  
      return queryResult;
    };
  
    getGalleryById = async (id:number) => {
      const queryResult = await this.knex<Gallery>("gallery")
      .select('gallery.idol_image', 'javidols.idol_name')
      .join('javidols', 'javidols.id', '=', 'gallery.idol_id')
      .where('javidols.id', id);
  
      return queryResult;
    };
  
  
  }
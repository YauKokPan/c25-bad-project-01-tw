import { Knex } from "knex";
import path from "path";

interface idolRow {
    idol_id: number;
    idol_name: string;
    idol_info: Text;
    profile_pic:string;
  }
  
  interface galleryRow {
    idol_id: number;
    idol_name: string;
    idol_image:string;
  }



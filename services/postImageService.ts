import axios from "axios";
import type { Knex } from "knex";

interface OutputObj {
  name: string;
  prob: number;
  id: number;
  img: string;
}

export class PostImageService {
  constructor(private knex: Knex) {}

  postImage = async (filename: string): Promise<OutputObj[] | null> => {
    const resp = await axios(`http://127.0.0.1:8000/postImage?img=${filename}`);
    const result = resp.data;
    const output: OutputObj[] | null = [];
    for (let elem of result.results) {
      const name = elem.split(":")[0];
      const prob = elem.split(" ").pop();
      await this.knex("javidols")
        .select("*")
        .where("idol_name", name)
        .then((obj) => {
          const outputObj = {
            name,
            prob,
            id: obj[0].id,
            img: obj[0].profile_pic,
          };
          output.push(outputObj);
        });
    }
    return output;
  };
}

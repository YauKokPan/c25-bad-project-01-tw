export interface Idols {
  id: number;
  idol_name: string;
  idol_info: string;
  profile_pic: string;
}

export interface Gallery {
  id: number;
  idol_id: number;
  idol_name: string;
  idol_image: string;
}

export interface Code {
  id: number;
  idol_id: number;
  idol_name: string;
  idol_code: string;
  title:Text;
  release_date:string;
}

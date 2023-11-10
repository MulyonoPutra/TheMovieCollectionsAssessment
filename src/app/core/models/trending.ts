import { Movies } from "./movies";

export interface Trending extends Movies {
  media_type: string;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

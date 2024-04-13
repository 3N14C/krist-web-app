import { ICategory } from "./category.interface";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: ICategory;
}

import { IProduct } from "./product.interface";

export interface ICategory {
  id: string;
  title: string;
  img: string;

  products: IProduct[];
}

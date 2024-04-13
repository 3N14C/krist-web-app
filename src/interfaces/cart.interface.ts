import { Color, Size } from "@prisma/client";

export interface ICartProduct {
  id: string;
  name: string;
  img: string;
  price: number;
  size: {
    id: string
    name: string
  }
  color: {
    id: string
    name: string
  }

  count: number;
}

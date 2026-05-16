import { recipes } from "@/features/calculator/constants/recipes";

export type Item = {
  name: string;
  image: string;
};

export type ItemName = keyof typeof recipes
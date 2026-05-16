export type Ingredient = {
  name: string;
  count: number;
}

export type Recipe = {
  name: string;
  ingredients: Ingredient[];
  ed: number;
}

export const recipes: Record<string, Recipe> = {
  "천상의 디저트 파티": {
    name: "천상의 디저트 파티",
    ingredients: [
      { name: "하모니 푸딩", count: 1 },
      { name: "허니허니 와플", count: 1 },
      { name: "달콤동동 화채", count: 1 }
    ],
    ed: 30000,
  },
  "하모니 푸딩": {
    name: "하모니 푸딩",
    ingredients: [
      { name: "눈꽃 열매", count: 2 },
      { name: "천상의 멜론", count: 2 },
    ],
    ed: 18000,
  },
  "허니허니 와플": {
    name: "허니허니 와플",
    ingredients: [
      { name: "스윗 스타 포테이토", count: 2 },
      { name: "눈꽃 열매", count: 1 },
    ],
    ed: 12000,
  },
  "달콤동동 화채": {
    name: "달콤동동 화채",
    ingredients: [
      { name: "천상의 멜론", count: 2 },
      { name: "큐어 토마토", count: 2 },
    ],
    ed: 18000,
  },
} as const;

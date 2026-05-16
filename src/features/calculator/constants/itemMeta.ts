import { ItemName } from "../types"

export const itemMetas: { name: ItemName; image: string }[] = [
  {
    name: "천상의 디저트 파티",
    image: "/image/heavenly-dessert-party.png"
  },
  {
    name: "하모니 푸딩",
    image: "/image/harmony-pudding.png"
  },
  {
    name: "허니허니 와플",
    image: "/image/honey-honey-waffle.png"
  },
  {
    name: "달콤동동 화채",
    image: "/image/sweet-fruit-bowl.png"
  }
] as const;

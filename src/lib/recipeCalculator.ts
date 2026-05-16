import { recipes, ItemName } from "@/data/recipes"

type CountMap = Record<string, number>

type CalcResult = {
  crops: CountMap
  foods: CountMap
  foodsCost: number;
  cost: number;
}

export function calculate(item: ItemName, count: number): CalcResult {
  const result: CalcResult = {
    crops: {},
    foods: {},
    foodsCost: 0,
    cost: 0,
  }

  traverse(item, count, result)

  return result
}

function traverse(item: ItemName, count: number, result: CalcResult) {
  if (isCrop(item)) {
    result.crops[item] = (result.crops[item] || 0) + count
    return
  }

  if (isFood(item)) {
    result.foods[item] = (result.foods[item] || 0) + count
    result.cost += getPrice(item) * count
  }
  else {
    result.cost += getPrice(item) * count
    result.foodsCost += getPrice(item) * count
  }

  const recipe = recipes[item]

  for (const ing of recipe.ingredients) {
    traverse(ing.name, ing.count * count, result)
  }
}

function isCrop(item: ItemName): boolean {
  return !recipes[item]
}

export function isFood(item: ItemName): boolean {
  return !recipes[recipes[item].ingredients[0].name]
}

function getPrice(item: ItemName): number {
  return recipes[item].ed
}

// console.log(calculate("천상의 디저트 파티", 1))

import { recipes, ItemName } from "@/data/recipes"

type CalcResult = {
  materials: Record<string, number>
  cost: number;
}

export function calculate(item: ItemName, count: number): CalcResult {
  const recipe = recipes[item]

  if (!recipe) {
    return {
      materials: { [item]: count },
      cost: 0
    }
  }

  const result: CalcResult = {
    materials: {},
    cost: recipe.ed * count
  }

  for (const ing of recipe.ingredients) {
    const subResult = calculate(ing.name, ing.count * count)

    for (const key in subResult.materials) {
      result.materials[key] = (result.materials[key] || 0) + subResult.materials[key]
    }

    result.cost += subResult.cost
  }

  return result
}

// console.log(calculate("천상의 디저트 파티", 1))

export interface RecipeRoot {
  version: number
  recipes: Recipe[]
}

export interface Recipe {
  name: string
  description: string
  ingredients: string[][]
  preparation: string[][]
  stats: Stats
}

export interface Stats {
  shc: number
  mass: number
  temperature: number
}

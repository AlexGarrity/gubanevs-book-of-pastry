export type RecipeList = Recipe[];

export interface Recipe {
  version?: number;
  name?: string;
  description?: string;
  ingredients?: string[][];
  preparation?: string[][];
  stats?: Stats;
}

export interface Stats {
  shc: number;
  mass: number;
  temperature: number;
}

export type DoughsRoot = DoughDefinition[];

export interface DoughDefinition {
  version?: number;
  name?: string;
  description?: string[];
  stats?: Stats;
}

export interface Stats {
  shc_ratio: ShcRatio;
  target_temperature: number;
  difficulty_class: number;
}

export interface ShcRatio {
  flour?: number;
  butter?: number;
  water?: number;
  oil?: number;
}

export type CircularStrategy = 'reuse' | 'repair' | 'remanufacture' | 'recycling' | 'baseline';

export interface CriteriaScores {
  cost: number;
  environmental: number;
  energy: number;
  circularity: number;
  supplyChainRisk: number;
  technicalFeasibility: number;
}

export interface DesignAlternative {
  id: string;
  name: string;
  strategy: CircularStrategy;
  description: string;
  scores: CriteriaScores;
  weightCost: number;
  weightEnvironmental: number;
  weightEnergy: number;
  weightCircularity: number;
  weightSupplyChain: number;
  weightFeasibility: number;
  componentChanges: ComponentChange[];
  stakeholderComments: StakeholderComment[];
  productImage?: string;
}

export interface ComponentChange {
  componentId: string;
  componentName: string;
  originalDesign: string;
  newDesign: string;
  changeType: 'material' | 'geometry' | 'fastening' | 'coating' | 'modular';
}

export interface StakeholderComment {
  id: string;
  stakeholder: string;
  role: 'engineer' | 'supply_chain' | 'management' | 'sustainability' | 'sustainability_expert';
  comment: string;
  timestamp: Date;
  rating: number;
}

export interface StakeholderProfile {
  id: string;
  name: string;
  role: 'engineer' | 'supply_chain' | 'management' | 'sustainability' | 'sustainability_expert';
  avatar: string;
  priorityWeights: Omit<CriteriaScores, 'technicalFeasibility'>;
}

export interface WeightPreset {
  id: string;
  name: string;
  description: string;
  weights: Omit<CriteriaScores, 'technicalFeasibility'>;
  color: string;
}

export const CRITERIA_LABELS: Record<keyof CriteriaScores, string> = {
  cost: 'Cost Performance',
  environmental: 'Environmental Impact',
  energy: 'Energy Efficiency',
  circularity: 'Circularity Score',
  supplyChainRisk: 'Supply Chain Risk',
  technicalFeasibility: 'Technical Feasibility',
};

export const STRATEGY_COLORS: Record<CircularStrategy, string> = {
  baseline: '#94a3b8',
  reuse: '#ec4899',
  repair: '#06b6d4',
  remanufacture: '#8b5cf6',
  recycling: '#10b981',
};

export const STRATEGY_LABELS: Record<CircularStrategy, string> = {
  baseline: 'Baseline (Linear)',
  reuse: 'Direct Reuse',
  repair: 'Repair & Refurbish',
  remanufacture: 'Remanufacturing',
  recycling: 'Material Recycling',
};

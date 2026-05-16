import type { DesignAlternative, StakeholderProfile, WeightPreset } from './types';

export const companyProducts: Record<string, { name: string; description: string; imageUrl: string; focus: string; website: string }> = {
  ASML: {
    name: 'ASML — Lithography Systems',
    description: 'High-precision optical wafer lithography systems requiring ultra-clean modular designs.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    focus: 'EUV/ArF lithography machines; modular optical path design for 10nm+ node manufacturing.',
    website: 'https://www.asml.com',
  },
  Neways: {
    name: 'Neways — Electronic Manufacturing',
    description: 'Mission-critical PCBs and control electronics for aerospace, medical, and semiconductor equipment.',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80',
    focus: 'PCB assembly, cable harnesses, and smart electronic modules with long service life requirements.',
    website: 'https://www.neways.com',
  },
  Prodrive: {
    name: 'Prodrive — Advanced Mechanics',
    description: 'High-performance mechanical systems for semiconductor fabrication stages and precision motion platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    focus: 'Precision motion stages, vacuum-compatible mechanisms, and high-speed automation components.',
    website: 'https://www.prodrive-technologies.com',
  },
  KMWE: {
    name: 'KMWE — Precision Machining',
    description: 'Precision-machined structural components and vacuum-compatible enclosures for ASML supply chain.',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    focus: 'Large-frame precision machining, titanium/aluminum structural parts, and cleanroom-compatible enclosures.',
    website: 'https://www.kmwe.com',
  },
  Eriks: {
    name: 'Eriks — Industrial Seals & Bearings',
    description: 'High-performance seals, bearings, and fluid-handling components for semiconductor equipment.',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    focus: 'FKM/Viton seals, precision bearings, and contamination-control components with replaceability focus.',
    website: 'https://www.eriks.nl',
  },
};

export const mockAlternatives: DesignAlternative[] = [
  {
    id: 'alt-baseline',
    name: 'Baseline — Linear Model',
    strategy: 'baseline',
    description: 'Standard high-tech module with monolithic design, no end-of-life provisions. Represents current industry standard across ASML, Neways, and KMWE supply chains.',
    scores: { cost: 27, environmental: 18, energy: 22, circularity: 8, supplyChainRisk: 58, technicalFeasibility: 97 },
    weightCost: 0.20, weightEnvironmental: 0.10, weightEnergy: 0.10,
    weightCircularity: 0.10, weightSupplyChain: 0.20, weightFeasibility: 0.30,
    componentChanges: [],
    stakeholderComments: [
      { id: 'sc-1', stakeholder: 'Alex Chen', role: 'management', comment: 'Lowest upfront cost but long-term liability and ESG reporting exposure is growing rapidly.', timestamp: new Date('2026-01-15'), rating: 3 },
      { id: 'sc-2', stakeholder: 'Maria Santos', role: 'sustainability', comment: 'Carbon footprint per unit is 4.2x higher than remanufacturing alternative. Not aligned with ESG 2030.', timestamp: new Date('2026-01-16'), rating: 2 },
    ],
  },
  {
    id: 'alt-reuse',
    name: 'Reuse — Module Harvesting',
    strategy: 'reuse',
    description: 'Design for direct module reuse with standardized interfaces. Enables field recovery and redeployment across ASML lithography and Neways PCB applications.',
    scores: { cost: 48, environmental: 53, energy: 57, circularity: 68, supplyChainRisk: 32, technicalFeasibility: 86 },
    weightCost: 0.20, weightEnvironmental: 0.15, weightEnergy: 0.15,
    weightCircularity: 0.20, weightSupplyChain: 0.15, weightFeasibility: 0.15,
    componentChanges: [
      { componentId: 'c1', componentName: 'Optical Housing (KMWE)', originalDesign: 'Welded monolithic aluminum alloy 6061', newDesign: 'Bolted modular aluminum alloy 7075-T6 with O-ring seals', changeType: 'fastening' },
      { componentId: 'c2', componentName: 'PCB Module (Neways)', originalDesign: 'Potting compound encapsulation — non-recoverable', newDesign: 'Snap-fit removable connectors IP67 rated, serviceable', changeType: 'fastening' },
      { componentId: 'c3', componentName: 'Precision Stage (Prodrive)', originalDesign: 'Adhesive-bonded linear guides', newDesign: 'Magnetic retention with spring-loaded contacts for field extraction', changeType: 'geometry' },
    ],
    stakeholderComments: [
      { id: 'sc-3', stakeholder: 'Tom van Berg', role: 'supply_chain', comment: 'Recovery logistics for field modules needs dedicated reverse chain. 65% recovery rate realistic at scale.', timestamp: new Date('2026-01-18'), rating: 4 },
      { id: 'sc-4', stakeholder: 'Alex Chen', role: 'management', comment: 'TCO analysis shows 30% savings over 5-year lifecycle. Requires Finance validation before go-ahead.', timestamp: new Date('2026-01-19'), rating: 4 },
    ],
  },
  {
    id: 'alt-repair',
    name: 'Repair — Field Serviceable',
    strategy: 'repair',
    description: 'Modular design with field-replaceable subassemblies, diagnostic ports, and built-in health monitoring for periodic refurbishment. Widely applicable to Prodrive precision stages and Eriks seal housings.',
    scores: { cost: 63, environmental: 71, energy: 64, circularity: 75, supplyChainRisk: 25, technicalFeasibility: 80 },
    weightCost: 0.15, weightEnvironmental: 0.20, weightEnergy: 0.15,
    weightCircularity: 0.20, weightSupplyChain: 0.15, weightFeasibility: 0.15,
    componentChanges: [
      { componentId: 'c4', componentName: 'Power Supply Unit (Neways)', originalDesign: 'Soldered-on PCB, conformal coat encapsulation', newDesign: 'Hot-swap tray with gold-plated DIN connectors, service port', changeType: 'modular' },
      { componentId: 'c5', componentName: 'Seal Housing (Eriks)', originalDesign: 'Permanent FKM seal, press-fit installation', newDesign: 'Cartridge-style FKM seal with refill port, snap-ring retention', changeType: 'material' },
      { componentId: 'c6', componentName: 'Control Board (Neways)', originalDesign: 'Permanent conformal coating, no service access', newDesign: 'Removable shield with integrated service port, firmware updateable', changeType: 'modular' },
      { componentId: 'c7', componentName: 'Linear Guide (Prodrive)', originalDesign: 'Permanent adhesive mounting', newDesign: 'Clamp-mount with wear-indicating interface, field-replaceable', changeType: 'fastening' },
    ],
    stakeholderComments: [
      { id: 'sc-5', stakeholder: 'Elena Kowalski', role: 'engineer', comment: 'Service life extended to 15 years is realistic. Retrofit kit design is feasible in Q3. Training plan for field techs drafted.', timestamp: new Date('2026-01-20'), rating: 5 },
      { id: 'sc-6', stakeholder: 'Maria Santos', role: 'sustainability', comment: 'Extended service life cuts embodied carbon per operational year by 60%. Direct alignment with Science Based Targets.', timestamp: new Date('2026-01-21'), rating: 5 },
    ],
  },
  {
    id: 'alt-remanufacture',
    name: 'Remanufacturing — Core Recovery',
    strategy: 'remanufacture',
    description: 'Full core recovery program with certified remanufacturing. Critical components restored to OEM spec; remaining parts inspected and recertified. Developed for ASML module and KMWE structural part supply chains.',
    scores: { cost: 75, environmental: 87, energy: 79, circularity: 92, supplyChainRisk: 18, technicalFeasibility: 70 },
    weightCost: 0.10, weightEnvironmental: 0.25, weightEnergy: 0.20,
    weightCircularity: 0.25, weightSupplyChain: 0.10, weightFeasibility: 0.10,
    componentChanges: [
      { componentId: 'c8', componentName: 'Optical Frame (ASML)', originalDesign: 'Monolithic welded aluminum, single-life design', newDesign: 'Demountable segments, each serial-tracked with QR code, 5-cycle recovery', changeType: 'fastening' },
      { componentId: 'c9', componentName: 'Precision Stage (Prodrive)', originalDesign: 'One-piece cast iron, non-repairable', newDesign: 'Precision-ground interfaces, 100% recoverable, re-certified to OEM spec', changeType: 'geometry' },
      { componentId: 'c10', componentName: 'Fastener System (KMWE)', originalDesign: 'Mixed proprietary screws, inconsistent torque specs', newDesign: 'Unified M3/M4 metric socket-head, torque-mark coating for inspection', changeType: 'modular' },
      { componentId: 'c11', componentName: 'Corrosion Protection (KMWE)', originalDesign: 'Hard anodizing Type III, non-reversible', newDesign: 'Detectable anodizing + releasable barrier coating for 3x recoat cycles', changeType: 'coating' },
    ],
    stakeholderComments: [
      { id: 'sc-7', stakeholder: 'Zumbul Atan', role: 'engineer', comment: 'Remanufacturing protocol requires new qualification process. Timeline is 18 months. Dedicated facility at KMWE Eindhoven site identified.', timestamp: new Date('2026-01-22'), rating: 5 },
      { id: 'sc-8', stakeholder: 'Jian Wei', role: 'supply_chain', comment: 'Core acquisition and reverse logistics cost model validated with Operations. Net material savings of 42% projected.', timestamp: new Date('2026-01-23'), rating: 3 },
      { id: 'sc-11', stakeholder: 'Mirjam S. Meijer', role: 'sustainability_expert', comment: 'Core recovery aligns with EU Circular Economy Directive Article 11. A documented take-back scheme must be established before scaled deployment to ensure regulatory compliance and end-of-life traceability.', timestamp: new Date('2026-01-24'), rating: 5 },
    ],
  },
  {
    id: 'alt-recycling',
    name: 'Recycling — Design for Disassembly',
    strategy: 'recycling',
    description: 'Material-optimized design prioritizing end-of-life recyclability. Marked material streams, adhesive-free joints, and take-back program integration. Aligned with Eriks and KMWE material stream strategies.',
    scores: { cost: 42, environmental: 91, energy: 68, circularity: 88, supplyChainRisk: 15, technicalFeasibility: 92 },
    weightCost: 0.15, weightEnvironmental: 0.30, weightEnergy: 0.20,
    weightCircularity: 0.20, weightSupplyChain: 0.05, weightFeasibility: 0.10,
    componentChanges: [
      { componentId: 'c12', componentName: 'Structural Frame (KMWE)', originalDesign: 'Welded steel + structural adhesive bonding, mixed alloys', newDesign: 'Bolted steel with pure-material zones, no mixed alloys, ISO 22629 compliant', changeType: 'fastening' },
      { componentId: 'c13', componentName: 'Polymer Components (Eriks)', originalDesign: 'Blended engineering plastics (PA66+GF30)', newDesign: 'Single-polymer PP with ISO 11469 material code, color-coded for sorting', changeType: 'material' },
      { componentId: 'c14', componentName: 'Electrical Connectors (Neways)', originalDesign: 'SMD soldered connections — requires desoldering', newDesign: 'Mechanical crimp connectors, tool-free extraction, fully recyclable', changeType: 'fastening' },
      { componentId: 'c15', componentName: 'Coatings (KMWE)', originalDesign: 'Mixed surface treatments on same part', newDesign: 'Single coating system per material zone, strippable for recycling', changeType: 'coating' },
    ],
    stakeholderComments: [
      { id: 'sc-9', stakeholder: 'Maria Santos', role: 'sustainability', comment: 'Material recovery rate >95% achievable. ISO 14001 aligned. Matches ESG 2030 targets perfectly and reduces virgin material demand by 55%.', timestamp: new Date('2026-01-24'), rating: 5 },
      { id: 'sc-10', stakeholder: 'Alex Chen', role: 'management', comment: 'Highest environmental score but financial payback period is 7 years. Strategic buy-in from board needed. Consider hybrid approach with repair-first.', timestamp: new Date('2026-01-25'), rating: 3 },
    ],
  },
];

export const stakeholderProfiles: StakeholderProfile[] = [
  {
    id: 'stk-engineer',
    name: 'Elena Kowalski',
    role: 'engineer',
    avatar: 'EK',
    priorityWeights: { cost: 0.20, environmental: 0.10, energy: 0.15, circularity: 0.15, supplyChainRisk: 0.10 },
  },
  {
    id: 'stk-supply',
    name: 'Tom van Berg',
    role: 'supply_chain',
    avatar: 'TV',
    priorityWeights: { cost: 0.15, environmental: 0.05, energy: 0.05, circularity: 0.10, supplyChainRisk: 0.45 },
  },
  {
    id: 'stk-mgmt',
    name: 'Alex Chen',
    role: 'management',
    avatar: 'AC',
    priorityWeights: { cost: 0.30, environmental: 0.10, energy: 0.10, circularity: 0.05, supplyChainRisk: 0.30 },
  },
  {
    id: 'stk-sustain',
    name: 'Maria Santos',
    role: 'sustainability',
    avatar: 'MS',
    priorityWeights: { cost: 0.05, environmental: 0.35, energy: 0.30, circularity: 0.25, supplyChainRisk: 0.05 },
  },
];

export const weightPresets: WeightPreset[] = [
  {
    id: 'preset-balanced',
    name: 'Balanced',
    description: 'Equal priority across all criteria',
    weights: { cost: 0.20, environmental: 0.20, energy: 0.20, circularity: 0.20, supplyChainRisk: 0.20 },
    color: '#64748b',
  },
  {
    id: 'preset-cost-driven',
    name: 'Cost-Driven',
    description: 'Financial optimization as primary objective',
    weights: { cost: 0.45, environmental: 0.10, energy: 0.10, circularity: 0.10, supplyChainRisk: 0.15 },
    color: '#f59e0b',
  },
  {
    id: 'preset-environmental',
    name: 'Environmental Priority',
    description: 'Sustainability and circularity focused',
    weights: { cost: 0.10, environmental: 0.35, energy: 0.25, circularity: 0.25, supplyChainRisk: 0.05 },
    color: '#10b981',
  },
  {
    id: 'preset-supply-chain',
    name: 'Supply Chain Resilience',
    description: 'Risk mitigation and supply security',
    weights: { cost: 0.15, environmental: 0.05, energy: 0.05, circularity: 0.10, supplyChainRisk: 0.55 },
    color: '#3b82f6',
  },
];

export function calculateWeightedScore(
  alt: DesignAlternative,
  weights: Omit<import('./types').CriteriaScores, 'technicalFeasibility'>
): number {
  const { cost, environmental, energy, circularity, supplyChainRisk } = alt.scores;
  const w = weights;
  const total = w.cost + w.environmental + w.energy + w.circularity + w.supplyChainRisk;
  return (
    (cost * w.cost + environmental * w.environmental + energy * w.energy +
     circularity * w.circularity + supplyChainRisk * w.supplyChainRisk) / total
  );
}

export function getParetoFrontier(alts: DesignAlternative[]): Set<string> {
  const frontier = new Set<string>();
  for (const alt of alts) {
    let isDominated = false;
    for (const other of alts) {
      if (other.id === alt.id) continue;
      if (
        other.scores.environmental >= alt.scores.environmental &&
        other.scores.cost >= alt.scores.cost &&
        other.scores.energy >= alt.scores.energy &&
        other.scores.circularity >= alt.scores.circularity &&
        (other.scores.environmental > alt.scores.environmental ||
          other.scores.cost > alt.scores.cost ||
          other.scores.energy > alt.scores.energy ||
          other.scores.circularity > alt.scores.circularity)
      ) {
        isDominated = true;
        break;
      }
    }
    if (!isDominated) frontier.add(alt.id);
  }
  return frontier;
}

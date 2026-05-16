# AT/AN Circular Economy Visualization

Interactive visualization dashboard for analyzing circular economy design strategies in high-tech manufacturing (ASML supply chain).

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (hot-reload enabled)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
  components/   # React UI components
  data.ts        # Design alternatives and mock data
  types.ts       # TypeScript type definitions
  App.tsx        # Main application
```

## Visualizations

- **Pareto Frontier Analysis** — Interactive scatter plot with dynamic Pareto-optimal frontier
- **Decision Matrix** — Weighted multi-criteria evaluation of alternatives
- **Radar Comparison** — Multi-dimensional capability comparison
- **Stakeholder View** — Role-weighted strategy recommendations
- **Trade-off Panel** — Cost vs. environmental impact trade-off
- **Design Alternatives Explorer** — Detailed scores, component changes, and stakeholder feedback

## Data

Five circular economy strategies are modeled: Baseline (Linear), Direct Reuse, Repair & Refurbish, Remanufacturing, and Material Recycling. Each is scored across six criteria and annotated with stakeholder comments.

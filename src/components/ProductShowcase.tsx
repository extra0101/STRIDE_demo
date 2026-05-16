import { ExternalLink } from 'lucide-react';
import { companyProducts } from '../data';

const companies = Object.entries(companyProducts);

export function ProductShowcase() {
  return (
    <div className="product-showcase">
      <div className="showcase-header">
        <h3 className="showcase-title">Industry Partner Products</h3>
        <p className="showcase-subtitle">
          High-tech manufacturing products from STRIDE project collaborators. Click to explore each company.
        </p>
      </div>
      <div className="showcase-grid">
        {companies.map(([key, company]) => (
          <a
            key={key}
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="product-card"
            title={`Visit ${key} — ${company.name}`}
          >
            <div className="product-image-wrapper">
              <img
                src={company.imageUrl}
                alt={company.name}
                className="product-image"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div
                className="product-image-fallback"
                style={{ display: 'none' }}
              >
                <span className="fallback-icon">
                  {key.split('').slice(0, 2).join('')}
                </span>
              </div>
              <div className="product-image-overlay" />
              <div className="product-company-badge">{key}</div>
              <div className="product-link-icon">
                <ExternalLink size={13} />
              </div>
            </div>
            <div className="product-info">
              <h4 className="product-name">{company.name.split(' — ')[1] || company.name}</h4>
              <h5 className="product-company-full">{company.name.split(' — ')[0]}</h5>
              <p className="product-focus">{company.focus}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

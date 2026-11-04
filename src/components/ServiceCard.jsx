import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  Calculator, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

const iconMap = {
  Home,
  Building2,
  ShieldCheck,
  UserCheck,
  Calculator,
};

const ServiceCard = ({ service, onBookClick }) => {
  const IconComponent = iconMap[service.icon] || Home;

  return (
    <div className="service-card">
      <div className="service-icon-box">
        <IconComponent size={28} />
      </div>

      <span className="service-price-tag">
        Starting {service.priceStartingAt}
      </span>

      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.shortDesc}</p>

      {service.features && service.features.length > 0 && (
        <ul className="service-features-list">
          {service.features.slice(0, 3).map((feat, index) => (
            <li key={index} className="service-feature-item">
              <CheckCircle2 size={15} className="service-feature-icon" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
        <Link
          to={`/services?highlight=${service.id}`}
          className="btn btn-outline btn-sm"
          style={{ flex: 1 }}
        >
          View Details
        </Link>
        <button
          type="button"
          onClick={() => {
            if (onBookClick) {
              onBookClick(service);
            } else {
              window.location.href = `/services?book=${service.id}#consultation`;
            }
          }}
          className="btn btn-primary btn-sm"
          style={{ flex: 1 }}
        >
          Book Service <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

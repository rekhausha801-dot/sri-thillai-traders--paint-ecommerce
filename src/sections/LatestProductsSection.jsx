import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/LatestProductsSection.css';

const LatestProductsSection = () => {
  const latestProducts = PRODUCTS.slice(0, 4);

  return (
    <section className="latest-products-section">
      <div className="container">
        {/* Section Header */}
        <div className="latest-products-header">
          <div className="latest-products-title-col">
            <div className="latest-products-tag">
              <span className="latest-products-dash">—</span>
              <span>CURATED FOR YOU</span>
            </div>
            <h2 className="latest-products-heading">
              Latest <span className="latest-products-accent">Projects</span>
            </h2>
          </div>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="latest-products-grid">
          {latestProducts.map((product) => (
            <div key={product.id} className="latest-product-col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProductsSection;

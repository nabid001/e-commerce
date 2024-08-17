import ProductsGridSection from "@/components/shared/ProductsGridSection";
import {
  getMostPopularProducts,
  getNewestProducts,
} from "@/db/actions/product.action";

const Home = async () => {
  return (
    <div className="mt-7 space-y-12">
      <ProductsGridSection
        title="Most Popular"
        productFetcher={getMostPopularProducts}
      />
      <ProductsGridSection title="Newest" productFetcher={getNewestProducts} />
    </div>
  );
};

export default Home;

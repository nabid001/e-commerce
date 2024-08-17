import ProductCard from "@/components/shared/card/ProductCard";
import { getProducts } from "@/db/actions/product.action";
import React from "react";

const page = async () => {
  const products = await getProducts();

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default page;

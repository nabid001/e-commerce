import { ProductCardSkeleton } from "@/components/shared/card/ProductCardSkeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default Loading;

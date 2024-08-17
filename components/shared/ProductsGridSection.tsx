import { Product } from "@prisma/client";
import React, { Suspense } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./card/ProductCard";
import { ProductCardSkeleton } from "./card/ProductCardSkeleton";

type Type = {
  title: string;
  productFetcher: () => Promise<Product[]>;
};
const ProductsGridSection = ({ title, productFetcher }: Type) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button asChild variant="outline">
          <Link href={`/products`} className="space-x-2">
            View All
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productFetcher={productFetcher} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsGridSection;

const ProductSuspense = async ({
  productFetcher,
}: {
  productFetcher: () => Promise<Product[]>;
}) => {
  return (await productFetcher()).map((item) => (
    <ProductCard key={item.id} {...item} />
  ));
};

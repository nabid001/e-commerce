import React from "react";
import PageHeader from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductTable from "../_components/ProductTable";

const Products = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <PageHeader>Product</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );
};

export default Products;

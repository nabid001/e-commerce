import PageHeader from "@/app/admin/_components/PageHeader";
import ProductForm from "@/app/admin/_components/ProductForm";
import { getProductById } from "@/app/admin/actions/product";
import React from "react";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await getProductById(id);

  return (
    <div>
      <PageHeader>Edit</PageHeader>
      <ProductForm product={product} />
    </div>
  );
};

export default page;

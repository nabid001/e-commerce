import CheckoutForm from "@/components/shared/CheckoutForm";
import db from "@/db/db";
import { notFound } from "next/navigation";
import React from "react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PurchasePage = async ({ params: { id } }: { params: { id: string } }) => {
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  const paymentIntent = stripe.paymentIntents.create({
    amount: product?.priceInCents,
    currency: "USD",
    metadata: { productId: product.id },
  });

  const clientSecret = (await paymentIntent).client_secret;

  if (clientSecret == null) {
    throw Error("Payment intent failed");
  }

  return <CheckoutForm product={product} clientSecret={clientSecret} />;
};

export default PurchasePage;

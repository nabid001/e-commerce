import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    const change = event.data.object;
    const productId = change.metadata.productId;
    const email = change.billing_details.email;
    const pricePaidInCents = change.amount;

    const product = await db.product.findUnique({ where: { id: productId } });
    if (product == null || email == null)
      return new NextResponse("Bad Request", { status: 400 });

    const userFields = {
      email,
      orders: { create: { productId, pricePaidInCents } },
    };

    db.user.upsert({
      where: { email },
      create: userFields,
      update: userFields,
      // TODO: Select field remain to implement
    });
  }

  return new NextResponse("Hello");
}

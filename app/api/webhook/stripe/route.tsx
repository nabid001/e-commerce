/* eslint-disable no-unused-vars */
import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

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

    const {
      orders: [order],
    } = await db.user.upsert({
      where: { email },
      create: userFields,
      update: userFields,
      select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
    });

    const downloadVerification = await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    await resend.emails.send({
      from: `support <onboarding@resend.dev>`,
      to: [email],
      subject: "Order Confirmation",
      react: <h1>Hi</h1>,
    });
  }

  return new NextResponse("Ok", { status: 200 });
}

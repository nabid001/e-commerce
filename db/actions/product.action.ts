"use server";

import { cache } from "@/lib/cache";
import db from "../db";

export const getProducts = cache(async () => {
  return await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}, ["/products", "getProducts"]);

export const getProductData = async () => {
  try {
    const [activeCount, inactiveCount] = await Promise.all([
      db.product.count({ where: { isAvailableForPurchase: true } }),
      db.product.count({ where: { isAvailableForPurchase: false } }),
    ]);

    return {
      activeCount,
      inactiveCount,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getMostPopularProducts = cache(
  async () => {
    return await db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);

export const getNewestProducts = cache(async () => {
  return await db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}, ["/", "getNewestProducts"]);

export const userOrderExists = async ({
  productId,
  email,
}: {
  productId: string;
  email: string;
}) => {
  return (
    (await db.order.findFirst({
      where: { user: { email }, productId },
      select: { id: true },
    })) != null
  );
};

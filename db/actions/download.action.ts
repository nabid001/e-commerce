"use server";

import db from "../db";

export const createDownloadVerificationId = async (productId: string) => {
  return (
    await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    })
  ).id;
};

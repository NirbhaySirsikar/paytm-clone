"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString();
  const userId = session.user.id;
  if (!userId) {
    return {
      mesage: "User is not Logged In"
    };
  }
  await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: amount,
      status: "Processing",
      startTime: new Date(),
      provider: provider,
      token
    }
  })
  console.log({ token, user_identifier: userId, amount });
  return { token, user_identifier: userId, amount };
}


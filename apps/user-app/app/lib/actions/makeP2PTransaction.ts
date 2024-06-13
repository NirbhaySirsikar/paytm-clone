"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function makeP2PTransaction(amount: number, to: string) {
  const session = await getServerSession(authOptions);
  const from = session.user.id;
  if (!from) {
    return {
      message: "User is not Logged In"
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: to
    }
  });

  if (!toUser) {
    return {
      message: "User not found"
    }
  }

  await prisma.$transaction(async (tx) => {
    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(from) }
    })

    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error('Insufficient funds');
    }
    tx.$queryRaw`SELECT * FROM Balance WHERE userId=${Number(from)} OR userId=${toUser.id} FOR UPDATE`;
    await tx.balance.update({
      where: { userId: Number(from) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });

    await tx.p2pTransfer.create({
      data: {
        amount: amount,
        timestamp: new Date(),
        fromUserId: Number(from),
        toUserId: toUser.id
      }
    })
  })
}

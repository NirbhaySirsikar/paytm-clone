import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { TransferMoney } from "../../../components/TransferMoney";

export default async function() {
  const transactions = await getOnRampTransactions();

  return <div className="w-screen">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
      P2P Transfer
    </div>
    <div className="grid grid-cols-1 p-4 md:grid-cols-2 p-4">
      <div>
        <TransferMoney />
      </div>
      <div>
        <OnRampTransactions transactions={transactions} />
      </div>
    </div>
  </div>
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id)
    }
  });
  return txns.map(t => ({
    time: t.timestamp,
    amount: t.amount
  }))
}

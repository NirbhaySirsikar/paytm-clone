import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
  transactions
}: {
  transactions: {
    time: Date,
    amount: number,
    // TODO: Can the type of `status` be more specific?
    status?: string,
    provider?: string
  }[]
}) => {
  if (!transactions.length) {
    return <Card title="Recent Transactions">
      <div className="text-center pb-8 pt-8">
        No Recent transactions
      </div>
    </Card>
  }
  return <Card title="Recent Transactions">
    <div className="pt-2">
      {transactions.map(t => <div className="flex justify-between border-b border-slate-300 ">
        <div>
          <div className="flex items-center">
            <div className="text-sm">
              Received INR
            </div>
            <PaymentStatus status={t.status || "Success"} />
          </div>
          <div className="text-slate-600 text-xs">
            {t.time.toDateString()}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          + Rs {t.amount / 100}
        </div>

      </div>)}
    </div>
  </Card>
}

const PaymentStatus = ({ status }: { status: string }) => {
  if (status == "Processing")
    return <div className="ml-2 w-3 h-3 bg-yellow-500 rounded-full">
    </div>
  if (status == "Failure")
    return <div className="ml-2 w-3 h-3 bg-red-500 rounded-full">
    </div>

  else
    return <div className="ml-2 w-3 h-3 bg-green-500 rounded-full">
    </div>
}

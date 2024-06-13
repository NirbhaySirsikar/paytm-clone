"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { makeP2PTransaction } from "../app/lib/actions/makeP2PTransaction";

export const TransferMoney = () => {
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  return <Card title="Transfer Money">
    <div className="w-full">
      <TextInput label={"Number"} placeholder={"Number"} onChange={(value) => {
        setNumber(value);
      }} />
      <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
        setAmount(value);
      }} />
      <div className="flex justify-center pt-4">
        <Button onClick={async () => {
          await makeP2PTransaction(Number(amount) * 100, number);
          alert("Payment done");
          setNumber("");
          setAmount("");
        }}>
          Send Money
        </Button>
      </div>
    </div>
  </Card>
}

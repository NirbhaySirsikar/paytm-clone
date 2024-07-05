"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransactions";

const SUPPORTED_BANKS = [{
  name: "HDFC Bank",
  redirectUrl: "https://netbanking.hdfcbank.com"
}, {
  name: "Axis Bank",
  redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  return <Card title="Add Money">
    <div className="w-full">
      <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
        setAmount(value);
      }} />
      <div className="py-4 text-left">
        Bank
      </div>
      <Select onSelect={(value) => {
        setProvider(SUPPORTED_BANKS.find(x => x.name == value)?.name || "")
        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
      }} options={SUPPORTED_BANKS.map(x => ({
        key: x.name,
        value: x.name
      }))} />
      <div className="flex justify-center pt-4">
        <Button onClick={async () => {
          if (amount == "" || Number(amount) <= 0) return;
          const response = await createOnRampTransaction(Number(amount) * 100, provider);
          alert(`Please share this info with your bank:\n ${JSON.stringify(response)}`)
          navigator.clipboard.writeText(JSON.stringify(response));
          // window.location.href = redirectUrl || "";
        }}>
          Add Money
        </Button>
      </div>
    </div>
  </Card>
}

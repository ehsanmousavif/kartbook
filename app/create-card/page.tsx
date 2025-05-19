"use client";
import { Button } from "@heroui/button";
import { useState } from "react";
import BankCard from "./bankCard";

export default function CreateCard({}) {
  const [cardNumber, setCardNumber] = useState<boolean>(true);

  const [value, setValue] = useState("");

  function setInput(e) {
    setValue(e.target.value);
  }

  return (
    <div>
      {cardNumber && (
        <div className="w-full h-52 flex flex-col justify-center items-center gap-4">
          <input
            className="p-2 rounded-lg border border-gray-300"
            type="text"
            value={value}
            onChange={setInput}
            maxLength={16}
          />
          <div className="w-full px-4">
            <p className="text-left text-sm font-medium">
              شماره کارت شما: {value.replace(/(.{4})(?=.)/g, "$1-")}
            </p>
          </div>
          <Button
            color="primary"
            isDisabled={value.length < 16}
            onPress={() => {
              setCardNumber(false);
            }}
          >
            تایید
          </Button>
        </div>
      )}
      {<BankCard CardNumber={value} />}
    </div>
  );
}

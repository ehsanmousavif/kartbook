"use client";

import { Button } from "@heroui/button";
import { useState, useContext } from "react";
import { Prisma } from "@db";

import { StepContext } from "./page";

interface Userdata {
  data: Prisma.UserGetPayload<{
    omit: { shabaNumber: true };
  }>[];
  onUserFound: (user: any) => void; // بعداً تایپشو درست می‌کنیم
}

export default function CreateCards({ data, onUserFound }: Userdata) {
  const { setStep } = useContext(StepContext);

  const [value, setValue] = useState("");
  const dataCartNumber = data;

  function setInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  const normalizedInput = value.replace(/[^0-9]/g, "");

  const user = data.find(
    (item) =>
      item.cardNumber &&
      item.cardNumber.replace(/[^0-9]/g, "") === normalizedInput
  );

  return (
    <div>
      <div className="w-full h-52 flex flex-col justify-center items-center gap-4">
        <input
          className="p-2 rounded-lg border border-gray-300"
          maxLength={16}
          type="text"
          value={value}
          onChange={setInput}
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
            if (!dataCartNumber) {
              alert("ریدی");

              return;
            }
            setStep("verifyCard");
            onUserFound(user);
          }}
        >
          تایید
        </Button>
      </div>
    </div>
  );
}

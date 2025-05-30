"use client";

import { Button } from "@heroui/button";
import { useState } from "react";
import useSWR from "swr";
import { Prisma } from "@db";

import BankCard from "./bank-card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CreateCard() {
  const [cardNumbers, setCardNumbers] = useState<boolean>(true);
  const [bankCards, setBankCards] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const { data, error, isLoading } = useSWR<{
    success: true;
    data: Prisma.UserGetPayload<{ omit: { shabaNumber: true } }>[];
  }>("/api/users", fetcher);

  function setInput(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  if (error) return <p>خطا در دریافت داده‌ها</p>;
  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (!data) return <p>داده‌ای دریافت نشد</p>;

  // پیدا کردن کاربر بر اساس شماره کارت وارد شده
  const cardExists = data.data.find((item) => item.cardNumber === value);

  return (
    <div>
      {cardNumbers && (
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
              if (!cardExists) {
                alert("ریدی");

                return;
              }
              setCardNumbers(false);
              setBankCards(true);
            }}
          >
            تایید
          </Button>
        </div>
      )}
      {bankCards && cardExists && (
        <BankCard
          cardNumber={cardExists.cardNumber ?? ""}
          firstName={cardExists.firstName}
          lastName={cardExists.lastName}
        />
      )}
    </div>
  );
}

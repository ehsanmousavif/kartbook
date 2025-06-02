"use client";

import { createContext, useState } from "react";
import CreateCards from "./create-card";
import BankCard from "./bank-card";
import DomainInputForm from "./domin-input-form";
import useSWR from "swr";
import { Prisma } from "@db";

// ساخت context ساده
export const StepContext = createContext<any>("");
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CreateCard() {
  const { data, error, isLoading } = useSWR<{
    success: true;
    data: Prisma.UserGetPayload<{ omit: { shabaNumber: true } }>[];
  }>("/api/users", fetcher);
    const FindData = data?.data.find((item) => item.cardNumber);
    const [existingData, setExistingData] = useState<Prisma.UserGetPayload<{
    omit: { shabaNumber: true };
  }> | null>(null);

  const [step, setStep] = useState<any>("enterCard");

  return (
    <StepContext.Provider value={{ step, setStep }}>
      {step === "enterCard" && (
        <CreateCards
          data={data?.data ?? []}
          onUserFound={(user) => setExistingData(user)}
        />
      )}
      {step === "verifyCard" && existingData && (
        <BankCard
          cardNumber={existingData?.cardNumber ?? ""}
          firstName={existingData?.firstName ?? ""}
          lastName={existingData?.lastName ?? ""}
        />
      )}
      {step === "enterDomain" && <DomainInputForm />}
    </StepContext.Provider>
  );
}

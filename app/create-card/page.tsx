"use client";

import { createContext, useState } from "react";
import { Prisma } from "@db";
import useSWR from "swr";

import CreateCards from "./create-card";
import DomainInputForm from "./domin-input-form";

export const StepContext = createContext<any>("");
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CreateCard() {
  const { data, error, isLoading } = useSWR<{
    success: true;
    data: Prisma.UserGetPayload<{ omit: { shabaNumber: true } }>[];
  }>("/api/users", fetcher);
  const [existingData, setExistingData] = useState<Prisma.UserGetPayload<{
    omit: { shabaNumber: true };
  }> | null>(null);

  console.log(error, isLoading);
  const [step, setStep] = useState<any>("enterCard");

  return (
    <StepContext.Provider value={{ step, setStep }}>
      {step === "enterCard" && (
        <CreateCards
          data={data?.data ?? []}
          onUserFound={(user) => setExistingData(user)}
        />
      )}
      {step === "enterDomain" && <DomainInputForm />}
    </StepContext.Provider>
  );
}

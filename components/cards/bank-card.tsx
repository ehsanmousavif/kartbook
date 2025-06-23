import { Button } from "@heroui/button";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { ValueContext } from "@/app/create-card/create-card";
import { Prisma } from "@db";

interface Data {
  cardNumber: string;
  firstName: string;
  lastName: string;
}

function formatCardNumber(cardNumber: string): string {
  const visible = cardNumber.slice(0, 16);
  const masked = "X".repeat(Math.max(0, 16 - visible.length));
  const combined = (visible + masked).slice(0, 16);

  return combined.match(/.{1,4}/g)?.join(" ") ?? "";
  //این تیکه رو ai نوشت کامل بلد نبودم یه دور یاد گرفتم بعد پیادش کردم
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BankCard({ firstName, lastName, cardNumber }: Data) {
  const [binBank, setBinBank] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);

  const { value } = useContext(ValueContext);

  value === cardNumber;
  const { data, isLoading, error } = useSWR<{
    success: true;
    data: Prisma.BankGetPayload<{}>[];
  }>("/api/bank-ui", fetcher);

  // گرفتن ۶ رقم اول کارت برای پیدا کردن بانک
  useEffect(() => {
    if (value && value.length >= 6) {
      setBinBank(value.slice(0, 6));
    } else {
      setBinBank("");
    }
  }, [value]);

  const bankData = data?.data?.find((x) => x.bin === binBank);

  return (
    <div>
      <div
        className={`w-[350px] h-[200px] rounded-2xl relative overflow-hidden bg-gradient-to-br ${
          bankData ? bankData.color : "bg-gray-400"
        } shadow-2xl text-white p-5`}
        style={{
          backgroundColor: bankData?.color || "#6b7280",
        }}
      >
        {/* لوگوی بانک */}
        <div className="absolute top-4 right-4">
          {bankData?.logoUrl && (
            <Image
              alt="bank logo"
              src={bankData.logoUrl}
              width={30}
              height={30}
              className="object-contain"
            />
          )}
        </div>

        {/* شماره کارت ماسک شده */}
        <div className="flex justify-center">
          <div className="mt-6 px-4 py-2  text-white text-lg tracking-widest font-mono w-fit">
            {formatCardNumber(value)}
          </div>
        </div>

        {/* شماره شبا */}
        <div className="flex items-center justify-between mt-3 text-sm px-2 text-neutral-300">
          <span>IR680120010000008927398369</span>
          <Button isIconOnly className="text-white" size="sm" variant="light">
            <svg
              fill="none"
              height="18"
              viewBox="0 0 24 24"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="currentColor" strokeWidth="1.5">
                <path d="M6 11c0-2.828 0-4.243.879-5.121C7.757 5 9.172 5 12 5h3c2.828 0 4.243 0 5.121.879C21 6.757 21 8.172 21 11v5c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22h-3c-2.828 0-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z" />
                <path
                  d="M6 19a3 3 0 0 1-3-3v-6c0-3.771 0-5.657 1.172-6.828C5.343 2 7.229 2 11 2h4a3 3 0 0 1 3 3"
                  opacity="0.5"
                />
              </g>
            </svg>
          </Button>
        </div>

        {/* نام صاحب کارت */}
        <div className="absolute bottom-4 left-5 text-sm text-neutral-200 font-medium">
          {firstName} {lastName}
        </div>
      </div>

      {/* چک باکس تایید */}
      <div className="flex flex-row items-center gap-4 justify-end mt-4">
        <input
          checked={isChecked}
          id="agreeCheckbox"
          type="checkbox"
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="agreeCheckbox">اطلاعات مطابقت دارد</label>
      </div>
    </div>
  );
}

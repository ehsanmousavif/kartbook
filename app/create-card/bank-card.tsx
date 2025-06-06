import { Button } from "@heroui/button";
import { useContext, useState } from "react";
import Image from "next/image";

import { StepContext } from "./page";

interface data {
  cardNumber: string;
  firstName: string;
  lastName: string;
}

export default function BankCard({ cardNumber, firstName, lastName }: data) {
  const { setStep } = useContext(StepContext);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div>
        <div className="w-[350px] h-[200px] rounded-2xl relative overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl text-white p-5">
          <div className="absolute top-4 right-4">
            <Image
              alt="bank logo"
              className=" object-contain"
              height={30}
              src="/logo.png"
              width={30}
            />
          </div>
          {/* شماره کارت */}
          <div className="flex justify-between text-xl font-semibold tracking-widest mt-12 px-2">
            <div>{cardNumber}</div>
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
            {firstName}
            {lastName}
            {JSON.stringify(firstName)}
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 justify-end mt-4">
          <input
            checked={isChecked}
            id="agreeCheckbox"
            type="checkbox"
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label htmlFor="agreeCheckbox">اطلاعات مطابقت دارد</label>
        </div>
        <Button
          color="primary"
          isDisabled={!isChecked}
          onPress={() => {
            setStep("enterDomain");
          }}
        >
          ارسال
        </Button>
      </div>
    </>
  );
}

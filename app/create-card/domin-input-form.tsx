"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Texturina } from "next/font/google";
import { useState } from "react";

export default function DomainInputForm() {
  const [domain, setDomain] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = /^[a-zA-Z0-9]{4,16}$/.test(domain);
  const showErrors = touched && !isValid;

  return (
    <div className="flex flex-col items-center justify-center  text-white p-4">
      <div className="flex flex-col items-center gap-6 max-w-md w-full">
        {/* Globe Icon */}
        <div className="   p-6 rounded-full"></div>

        {/* Title */}
        <div className="text-center space-y-1">
          <p className="text-lg font-medium">
            دامنه مورد نظر خود را وارد نمایید.
          </p>
          <p className="text-sm text-neutral-400">
            از دامنه جهت اشتراک گذاری کارت آنلاین استفاده خواهد شد.
          </p>
        </div>

        {/* Input */}
        <div className="w-full">
          <Input
            label="نام دامنه"
            variant="bordered"
            size="lg"
            classNames={{
              inputWrapper: showErrors ? "border-red-500" : "",
              input: "text-right",
            }}
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="مثلاً yourname123"
          />
          {showErrors && (
            <div className="text-sm text-red-400 mt-2 space-y-1 text-right">
              <p>لطفا حداقل ۴ کاراکتر وارد کنید.</p>
              <p>تنها حروف انگلیسی یا اعداد مجاز هستند.</p>
              <p>حداکثر طول نام کاربری ۱۶ کاراکتر است.</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between w-full gap-2">
          <Button
            isIconOnly
            variant="flat"
            color="default"
            radius="lg"
            size="lg"
          ></Button>
          <p hidden={!isValid || domain.length === 0}>k32.ir/{domain}</p>
          <Button
            color="success"
            className="w-full text-white text-base font-semibold"
            radius="lg"
            size="lg"
            isDisabled={!isValid}
          >
            ادامه
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Button } from "@heroui/button";
import { useState } from "react";

export default function CreateCard() {
  const [value, setValue] = useState("");

  function setInput(e) {
    setValue(e.target.value);
  }

  return (
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
      <Button isDisabled={value.length < 16} color="primary">
        تایید
      </Button>
    </div>
  );
}

"use client";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function CardPage() {
  return (
    <div className="w-full h-[50vh] px-4  flex flex-col items-center justify-center gap-10 ">
      <div className=" w-full flex flex-col items-center gap-4">
        <span className="text-primary-300 text-xl">
          کارتی برای نمایش وجود ندارد.
        </span>
        <span className="text-primary-300 text-sm">
          همین حالا یکی از کارت های خود را انلاین کنید.{" "}
        </span>
        <Link href="/create-card">
          {" "}
          <Button
            className="w-full max-w-none "
            color="primary"
            variant="bordered"
          >
            کارت خود را ثبت کنید
          </Button>
        </Link>
      </div>
    </div>
  );
}

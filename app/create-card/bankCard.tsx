import { Button } from "@heroui/button";
import { useState } from "react";
import DomainInputForm from "./domin-input-form";
interface Data {
  CardNumber: string;
}

export default function BankCard(data: { CardNumber: Data }) {
  const [isChecked, setIsChecked] = useState(false);
  const [domin, setDomin] = useState(false);
  const [cardPic, setCardPic] = useState(true);

  return (
    <>
      {cardPic && (
        <div>
          <div className="w-[350px] h-[200px] rounded-2xl relative overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-2xl text-white p-5">
            {/* لوگو */}
            <div className="absolute top-4 right-4">
              <img
                src="/logo.png"
                alt="bank logo"
                className=" object-contain"
                width={30}
                height={30}
              />
            </div>

            {/* شماره کارت */}
            <div className="flex justify-between text-xl font-semibold tracking-widest mt-12 px-2">
              <div>{data?.CardNumber}</div>
            </div>

            {/* شماره شبا */}
            <div className="flex items-center justify-between mt-3 text-sm px-2 text-neutral-300">
              <span>IR680120010000008927398369</span>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
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
              کیری کون زاده
            </div>
          </div>
          <div className="flex flex-row items-center gap-4 justify-end mt-4">
            <input
              type="checkbox"
              id="agreeCheckbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="agreeCheckbox">قبول دارم ممد زمانیان کونیه!</label>
          </div>
          <Button
            color="primary"
            isDisabled={!isChecked}
            onPress={() => {
              setDomin(true);
              setCardPic(false);
            }}
          >
            ارسال
          </Button>
        </div>
      )}
      {domin && (
        <div>
          <DomainInputForm />
        </div>
      )}
    </>
  );
}

import { NavbarItem } from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";

export const Navigation = () => {
  return (
    <div className=" bg-primary-400 flex flex-row items-center justify-center h-auto py-6 rounded-t-2xl">
      <ul className="hidden lg:flex gap-4 justify-start ml-2">
        {siteConfig.navItems.map((item) => (
          <div key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "#fff" }),
                "data-[active=true]: data-[active=true]:font-medium"
              )}
              color=""
              href={item.href}
            >
              <div className="bg-secondary-200 px-2 py-2 rounded-xl text-primary-800 hover:text-primary-700 transition-all">
                {item.label}
              </div>
            </NextLink>
          </div>
        ))}
      </ul>
    </div>
  );
};

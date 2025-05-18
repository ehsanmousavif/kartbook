"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { useState, useEffect } from "react";

import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const [content, setContent] = useState(<h1>در حال بارگذاری...</h1>);

  useEffect(() => {
    switch (pathname) {
      case "/card":
        setContent("کارت ها");
        break;
      case "/account":
        setContent("حساب کاربری");
        break;
      case "/wallet":
        setContent("کیف پول");
        break;
      case "/support":
        setContent("پشتیبانی");
        break;
      default:
        setContent("صفحه مورد نظر پیدا نشد");
    }
  }, [pathname]);

  return (
    <HeroUINavbar
      className="bg-primary-400 flex flex-row items-center"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full " justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit text-yellow-300">K32</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent>
        <span className="text-white  font-serif text-xl ">{content}</span>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex"></NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};

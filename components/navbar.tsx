"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { fontPacifico } from "@/config/fonts";
import imgLogo from "@/public/a.png";
import { useState } from "react";

export const Navbar = () => {
  const [locationSection, setLocationSection] = useState("");
  const handleTap = (val: string) => {
    if (val === locationSection) return;
    setLocationSection(val);
    const e = document.getElementsByClassName(val);
    if (e.length > 0) {
      e[0].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="bg-c_black">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <img src={imgLogo.src} alt="Logo" width="32" height="32" />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full items-center text-xl font-bold"
        justify="end"
        style={{
          fontFamily: fontPacifico.variable,
        }}
      >
        <ul className="flex items-center space-x-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <p
                className={clsx(
                  locationSection === item.href
                    ? "text-teal-500 border-b-2 border-teal-500"
                    : "text-white",
                  "cursor-pointer hover:text-teal-500"
                )}
                onClick={() => handleTap(item.href)}
              >
                {item.label}
              </p>
            </NavbarItem>
          ))}
          <Button
            className="bg-teal-500 text-white hover:bg-teal-600 text-base font-bold"
            size="sm"
            onClick={() => {
              handleTap("contact");
            }}
          >
            Contact
          </Button>
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <p
                className="cursor-pointer hover:text-teal-500"
                onClick={() => {
                  handleTap(item.href);
                }}
              >
                {item.label}
              </p>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

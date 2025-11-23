"use client";
import {
  Navbar as HeroUINavbar, // Renamed NextUINavbar to HeroUINavbar for clarity
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle, // This is the component for the mobile toggle
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Button, // Hero UI Button component
} from "@heroui/react";
import NextLink from "next/link";
import Image from "next/image";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontPacifico } from "@/config/fonts";
import { useState } from "react";

export const Navbar = () => {
  const [locationSection, setLocationSection] = useState("");

  const handleTap = (val: string) => {
    if (val === locationSection) return;
    setLocationSection(val);
    const sectionElement = document.getElementById(val);
    
    // Check if we are closing the menu on mobile after a click
    // This is often handled internally by NextUI/HeroUI when using NavbarMenuItem, 
    // but manually closing the menu state might be needed depending on the exact HeroUI implementation.
    // For now, we'll rely on the default behavior and focus on the structure.

    sectionElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // State to control the menu open/close status, often required for manual close after navigation on mobile
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Replaced NextUINavbar with HeroUINavbar for consistency
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-c_black/80 backdrop-blur-lg border-b border-white/10 py-4"
      // onMenuOpenChange={setIsMenuOpen} // Use this if you need to control the state manually
      // isMenuOpen={isMenuOpen} // And this
    >
      <div className="flex w-full max-w-6xl items-center mx-auto px-4 gap-6">
        
        {/* Brand/Logo Section */}
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image
              src="/a.png"
              alt="Logo"
              width={36}
              height={36}
              className="rounded-full w-9 h-9 object-cover border border-white/20"
              priority
            />
          </NextLink>
        </NavbarBrand>

        {/* Desktop Navigation Items */}
        <NavbarContent
          className="hidden md:flex flex-1 items-center justify-center text-lg font-semibold"
          justify="center"
          style={{
            fontFamily: fontPacifico.variable,
          }}
        >
          <ul className="flex items-center gap-8">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <button
                  type="button"
                  className={clsx(
                    "transition-colors border-b-2 border-transparent pb-1",
                    locationSection === item.href
                      ? "text-teal-400 border-teal-400"
                      : "text-white hover:text-teal-300"
                  )}
                  onClick={() => handleTap(item.href)}
                >
                  {item.label}
                </button>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        {/* Desktop Contact Button */}
        <NavbarContent className="hidden md:flex" justify="end">
          {/* Ensure the Button component from Hero UI is used correctly */}
          <Button
            // Use the standard Hero UI props for styling and functionality
            className="bg-teal-500 text-white hover:bg-teal-600 text-base font-semibold shadow-md rounded-full px-4 py-2"
            onClick={() => handleTap("contact")}
          >
            Contact
          </Button>
        </NavbarContent>

        {/* Mobile Menu Toggle (Fix Applied Here) */}
        {/* Place NavbarMenuToggle inside NavbarContent on the right side for mobile */}
        <NavbarContent className="flex md:hidden ml-auto" justify="end">
          {/* The NavbarMenuToggle component is specifically designed to handle the open/close state. */}
          <NavbarMenuToggle 
            aria-label="Toggle navigation" 
            // Hero UI/NextUI automatically handles the transition and icon change (open/close)
          />
        </NavbarContent>
      </div>

      {/* Mobile Menu Content */}
      <NavbarMenu className="md:hidden">
        <div className="mx-4 mt-4 flex flex-col gap-3 text-lg">
          {siteConfig.navMenuItems.map((item, index) => (
            // Use NavbarMenuItem for links inside the mobile menu
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <button
                type="button"
                className="w-full text-left py-2 text-white hover:text-teal-300"
                onClick={() => {
                  handleTap(item.href);
                  // Manually close menu if required after click
                  // setIsMenuOpen(false); 
                }}
              >
                {item.label}
              </button>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
      
    </HeroUINavbar>
  );
};
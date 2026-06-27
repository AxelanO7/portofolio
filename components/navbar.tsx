"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import clsx from "clsx";

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "About", href: "about" },
    { label: "Skills", href: "skills" },
    { label: "Projects", href: "projects" },
    { label: "Contact", href: "contact" },
  ];

  const handleTap = (val: string) => {
    setActiveSection(val);
    setIsMenuOpen(false);
    const sectionElement = document.getElementById(val);
    sectionElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-900/60 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <NextLink href="/" className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-800">
            <Image
              src="/a.png"
              alt="Jeremia Axelano"
              fill
              className="object-cover"
              sizes="32px"
              priority
            />
          </div>
          <span className="font-sans font-extrabold tracking-tight text-white text-sm select-none">
            Jeremia Axelano
          </span>
        </NextLink>

        {/* Desktop Nav Items */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                className={clsx(
                  "transition-colors pb-1 border-b-2",
                  activeSection === item.href
                    ? "text-emerald-400 border-emerald-400"
                    : "text-slate-400 hover:text-white border-transparent"
                )}
                onClick={() => handleTap(item.href)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Contact CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => handleTap("contact")}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-500 rounded-xl transition-all"
          >
            Contact
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 rounded-lg border border-slate-800 hover:bg-slate-900 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className={clsx(
              "w-4 h-0.5 bg-slate-300 rounded transition-transform duration-300",
              isMenuOpen && "rotate-45 translate-y-1"
            )}
          />
          <span
            className={clsx(
              "w-4 h-0.5 bg-slate-300 rounded transition-transform duration-300",
              isMenuOpen && "-rotate-45 -translate-y-1"
            )}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 px-6 py-4 flex flex-col gap-4 text-sm font-semibold shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              className={clsx(
                "w-full text-left py-2 transition-colors",
                activeSection === item.href ? "text-emerald-400" : "text-slate-400 hover:text-white"
              )}
              onClick={() => handleTap(item.href)}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleTap("contact")}
            className="w-full py-3 bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl transition-all text-center text-xs uppercase tracking-wider mt-2"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
};

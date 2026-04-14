"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, BarChart2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/timeline", label: "Timeline", icon: Clock },
    { to: "/stats", label: "Stats", icon: BarChart2 },
  ];

  return (
    <div className="navbar bg-white border-b border-base-200 px-4 md:px-12 sticky top-0 z-50 h-20">
      <div className="flex-1">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[#2D4F3F]">
          KeenKeeper
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="flex-none hidden md:block">
        <ul className="menu menu-horizontal px-1 gap-4">
          {links.map((link) => {
            const isActive = pathname === link.to;
            return (
              <li key={link.to}>
                <Link
                  href={link.to}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-md transition-all text-sm font-medium",
                    isActive 
                      ? "bg-[#2D4F3F] text-white shadow-md" 
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex-none md:hidden">
        <button 
          className="btn btn-ghost btn-circle text-[#2D4F3F]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-base-200 shadow-lg md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <ul className="menu p-4 gap-2">
            {links.map((link) => {
              const isActive = pathname === link.to;
              return (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md transition-all text-base font-medium",
                      isActive 
                        ? "bg-[#2D4F3F] text-white" 
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

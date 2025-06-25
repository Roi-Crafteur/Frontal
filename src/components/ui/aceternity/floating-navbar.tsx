"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Menu, User, LogOut, Bell, Moon, Sun } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
  onMenuClick,
  onThemeToggle,
  theme = 'light'
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  onMenuClick?: () => void;
  onThemeToggle?: () => void;
  theme?: 'light' | 'dark';
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-2xl dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-4 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        <button
          onClick={onMenuClick}
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>
        
        {navItems.map((navItem, idx) => (
          <a
            key={`link-${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 px-4 py-2 rounded-full transition-colors"
            )}
          >
            <span className="block sm:hidden">
              {navItem.icon}
            </span>
            <span className="hidden sm:block text-sm">
              {navItem.name}
            </span>
          </a>
        ))}
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onThemeToggle}
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-3 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          
          <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-3 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          
          <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:block">POISOT Paul</span>
          </button>
          
          <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-3 py-2 rounded-full hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
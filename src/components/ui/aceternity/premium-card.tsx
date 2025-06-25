import { cn } from "../../../lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const PremiumCard = ({ 
  children, 
  className, 
  hover = true, 
  gradient = false 
}: PremiumCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "relative rounded-2xl p-6 shadow-lg transition-all duration-300",
        gradient 
          ? "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900" 
          : "bg-white dark:bg-gray-800",
        "border border-gray-200/50 dark:border-gray-700/50",
        "hover:shadow-xl hover:border-teal-200 dark:hover:border-teal-700",
        className
      )}
    >
      {gradient && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export const PremiumCardHeader = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
};

export const PremiumCardTitle = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <h3 className={cn(
      "text-xl font-bold text-gray-800 dark:text-white mb-2",
      className
    )}>
      {children}
    </h3>
  );
};

export const PremiumCardDescription = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <p className={cn(
      "text-sm text-gray-600 dark:text-gray-300",
      className
    )}>
      {children}
    </p>
  );
};

export const PremiumCardContent = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
};

export const PremiumCardFooter = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => {
  return (
    <div className={cn("mt-6 pt-4 border-t border-gray-200 dark:border-gray-700", className)}>
      {children}
    </div>
  );
};
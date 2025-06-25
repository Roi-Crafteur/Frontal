import { cn } from "../../../lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    icon, 
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 focus:ring-teal-500 shadow-lg hover:shadow-xl",
      secondary: "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 focus:ring-gray-500 shadow-lg hover:shadow-xl",
      outline: "border-2 border-teal-500 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 focus:ring-teal-500",
      ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-gray-500",
      danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl"
    };
    
    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3 text-base"
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!loading && icon && <span className="mr-2">{icon}</span>}
        {children}
      </motion.button>
    );
  }
);

PremiumButton.displayName = "PremiumButton";
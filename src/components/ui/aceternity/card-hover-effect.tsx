import { cn } from "../../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon?: React.ReactNode;
    stats?: {
      value: string | number;
      label: string;
    }[];
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.link}
          className="relative group block p-1 sm:p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-r from-teal-500/[0.8] to-teal-600/[0.8] block rounded-2xl sm:rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
              {item.icon && (
                <div className="p-2 bg-teal-100 rounded-lg flex-shrink-0 w-fit">
                  {item.icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm sm:text-base">{item.title}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{item.description}</CardDescription>
              </div>
            </div>
            {item.stats && (
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4">
                {item.stats.map((stat, statIdx) => (
                  <div key={statIdx} className="text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-600">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl sm:rounded-2xl h-full w-full p-3 sm:p-4 lg:p-6 overflow-hidden bg-white border border-gray-200 dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 shadow-sm hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-2 sm:p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-800 font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-1 sm:mt-2 text-zinc-600 tracking-wide leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
};
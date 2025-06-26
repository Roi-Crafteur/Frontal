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
      change?: string;
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
          className="relative group block p-1 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-r from-teal-500/[0.8] to-teal-600/[0.8] block rounded-xl sm:rounded-2xl"
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
            <div className="flex flex-col space-y-2 sm:space-y-3">
              {/* Header avec icône et titre */}
              <div className="flex items-start space-x-2 sm:space-x-3">
                {item.icon && (
                  <div className="p-1.5 sm:p-2 bg-teal-100 rounded-lg flex-shrink-0">
                    {item.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xs sm:text-sm leading-tight">{item.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">{item.description}</CardDescription>
                </div>
              </div>
              
              {/* Statistiques */}
              {item.stats && (
                <div className={cn(
                  "grid gap-1 sm:gap-2",
                  item.stats.length === 2 ? "grid-cols-1" : "grid-cols-3"
                )}>
                  {item.stats.map((stat, statIdx) => (
                    <div key={statIdx} className={cn(
                      "text-center min-w-0",
                      item.stats!.length === 2 ? "border-b border-gray-200 pb-1 last:border-b-0 last:pb-0" : ""
                    )}>
                      <div className="flex items-center justify-center space-x-1">
                        <div className="text-xs sm:text-sm lg:text-base font-bold text-teal-600 leading-tight break-words">
                          {stat.value}
                        </div>
                        {stat.change && (
                          <div className="text-xs font-medium text-green-600 leading-tight">
                            {stat.change}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 leading-tight mt-0.5 break-words">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
        "rounded-lg sm:rounded-xl h-full w-full p-2 sm:p-3 lg:p-4 overflow-hidden bg-white border border-gray-200 dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 shadow-sm hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className="relative z-50 h-full">
        {children}
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
    <h4 className={cn("text-zinc-800 font-bold tracking-wide leading-tight", className)}>
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
        "text-zinc-600 tracking-wide leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
};
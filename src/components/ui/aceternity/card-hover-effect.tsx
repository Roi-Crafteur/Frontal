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
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-r from-teal-500/[0.8] to-teal-600/[0.8] block rounded-3xl"
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
            <div className="flex items-center space-x-4 mb-4">
              {item.icon && (
                <div className="p-2 bg-teal-100 rounded-lg">
                  {item.icon}
                </div>
              )}
              <div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </div>
            </div>
            {item.stats && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {item.stats.map((stat, statIdx) => (
                  <div key={statIdx} className="text-center">
                    <div className="text-2xl font-bold text-teal-600">
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
        "rounded-2xl h-full w-full p-6 overflow-hidden bg-white border border-gray-200 dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 shadow-sm hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
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
        "mt-2 text-zinc-600 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
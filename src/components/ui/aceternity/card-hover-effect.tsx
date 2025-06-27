import { cn } from "../../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";

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
      comparison?: string;
      priority?: boolean;
      trend?: 'up' | 'down';
    }[];
    showChart?: boolean;
    highlight?: boolean;
    alert?: boolean;
    status?: string;
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
          key={`${item.title}-${idx}`}
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
          <Card highlight={item.highlight} alert={item.alert}>
            <div className="flex flex-col space-y-2 sm:space-y-3">
              {/* Header avec icône et titre */}
              <div className="flex items-start space-x-2 sm:space-x-3">
                {item.icon && (
                  <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
                    item.highlight ? 'bg-blue-100 dark:bg-blue-900/20' : 
                    item.alert ? 'bg-orange-100 dark:bg-orange-900/20' : 
                    'bg-teal-100 dark:bg-teal-900/20'
                  }`}>
                    {item.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <CardTitle className={`text-xs sm:text-sm leading-tight ${
                    item.highlight ? 'text-blue-800 dark:text-blue-200' : 
                    item.alert ? 'text-orange-800 dark:text-orange-200' : 
                    'text-zinc-800 dark:text-zinc-200'
                  }`}>
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">{item.description}</CardDescription>
                </div>
                {item.status && (
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'excellent' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                    item.status === 'bon' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                    'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                  }`}>
                    {item.status.toUpperCase()}
                  </div>
                )}
              </div>
              
              {/* Statistiques avec priorité */}
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
                        <div className={`text-xs sm:text-sm lg:text-base font-bold leading-tight break-words ${
                          stat.priority ? 'text-blue-600 dark:text-blue-400 text-lg sm:text-xl' : 'text-teal-600 dark:text-teal-400'
                        }`}>
                          {stat.value}
                        </div>
                        {stat.change && (
                          <div className={`text-xs font-medium leading-tight ${
                            stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 
                            stat.trend === 'down' ? 'text-red-600 dark:text-red-400' : 
                            'text-gray-600 dark:text-gray-400'
                          }`}>
                            {stat.change}
                          </div>
                        )}
                      </div>
                      <div className={`text-xs leading-tight mt-0.5 break-words ${
                        stat.priority ? 'font-semibold text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {stat.label}
                      </div>
                      {stat.comparison && (
                        <div className="text-xs text-gray-400 leading-tight mt-0.5 break-words">
                          {stat.comparison}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 🎯 BOUTONS DE GRAPHIQUE */}
              {item.showChart && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-1">
                    <button className="flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors">
                      <BarChart3 className="w-3 h-3" />
                      <span>Commandes</span>
                    </button>
                    <button className="flex items-center space-x-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded text-xs font-medium hover:bg-amber-200 dark:hover:bg-amber-900/30 transition-colors">
                      <TrendingUp className="w-3 h-3" />
                      <span>Requêtes</span>
                    </button>
                    <button className="flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded text-xs font-medium hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors">
                      <span className="text-xs">€</span>
                      <span>Bénéfices</span>
                    </button>
                  </div>
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
  highlight,
  alert,
}: {
  className?: string;
  children: React.ReactNode;
  highlight?: boolean;
  alert?: boolean;
}) => {
  return (
    <div
      className={cn(
        "rounded-lg sm:rounded-xl h-full w-full p-2 sm:p-3 lg:p-4 overflow-hidden bg-white border border-gray-200 dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 shadow-sm hover:shadow-lg transition-all duration-300",
        className,
        highlight ? "border-blue-200 dark:border-blue-800" : "",
        alert ? "border-orange-200 dark:border-orange-800" : ""
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
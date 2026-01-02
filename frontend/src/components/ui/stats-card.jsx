import React from "react";
import { Card } from "./card";
import { cn } from "@/lib/utils";

export function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  variant = "default",
  className,
  iconClassName,
  valueClassName,
  trendClassName,
  ...props
}) {
  const getVariantClasses = () => {
    switch (variant) {
      case "tech":
        return "bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200/50 dark:border-blue-800/30 backdrop-blur-sm";
      case "glass":
        return "bg-white/10 dark:bg-gray-900/20 backdrop-blur-md border border-white/30 dark:border-gray-800/30";
      case "glow":
        return "shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300";
      default:
        return "";
    }
  };

  const getTrendClasses = () => {
    if (trend === "up") {
      return "text-trust-600 dark:text-trust-400";
    } else if (trend === "down") {
      return "text-alert-600 dark:text-alert-400";
    } else {
      return "text-muted-foreground";
    }
  };

  return (
    <Card 
      className={cn("overflow-hidden", getVariantClasses(), className)} 
      {...props}
    >
      <div className="p-6 relative">
        {/* Background pattern for tech style */}
        {variant === "tech" && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full border border-blue-300/20 dark:border-blue-700/20"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full border border-indigo-300/20 dark:border-indigo-700/20"></div>
          </div>
        )}

        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={cn("text-2xl font-bold", valueClassName)}>
              {value}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
            {trend && trendValue && (
              <p className={cn("text-xs font-medium flex items-center gap-1", getTrendClasses(), trendClassName)}>
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
              </p>
            )}
          </div>
          {icon && (
            <div className={cn("p-2 rounded-full bg-primary/10", iconClassName)}>
              {icon}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export function StatsCardGroup({ children, className, ...props }) {
  return (
    <div 
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)} 
      {...props}
    >
      {children}
    </div>
  );
}

export default StatsCard;
